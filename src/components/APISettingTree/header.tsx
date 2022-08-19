// API栏目的顶部功能栏
import { defineComponent, inject, onBeforeUnmount, PropType } from "vue";
import { css } from "@linaria/core";
import {
  NDropdown,
  NButton,
  NGi,
  NGrid,
  NInput,
  NIcon,
  useMessage,
} from "naive-ui";
import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { Promise } from "bluebird";

import { i18nCollection, i18nCommon } from "../../i18n";
import { SettingType, useAPISettingStore } from "../../stores/api_setting";
import {
  AnalyticsOutline,
  CloudUploadOutline,
  FolderOpenOutline,
} from "@vicons/ionicons5";
import {
  hotKeyCreateFolder,
  hotKeyCreateHTTPSetting,
  hotKeyMatchCreateHTTPSetting,
} from "../../helpers/hot_key";
import {
  addFolderDefaultValue,
  addFolderKey,
  addHTTPSettingDefaultValue,
  addHTTPSettingKey,
} from "../../constants/provide";
import { showError } from "../../helpers/util";
import { useRoute } from "vue-router";
import { newDefaultAPIFolder } from "../../commands/api_folder";
import { useAPIFolderStore } from "../../stores/api_folder";
import { newDefaultAPISetting } from "../../commands/api_setting";
import { ContentType, HTTPRequest } from "../../commands/http_request";
import { KVParam } from "../../commands/interface";

const addDropdownClass = css`
  .label {
    min-width: 180px;
  }
  .hotKey {
    float: right;
  }
`;

const importPostmanKey = "importPostman";

export default defineComponent({
  name: "APISettingTreeHeader",
  props: {
    onFilter: {
      type: Function as PropType<(value: string) => void>,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const message = useMessage();
    const folderStore = useAPIFolderStore();
    const settingStore = useAPISettingStore();

    const collection = route.query.id as string;
    const addHTTPSetting = inject(
      addHTTPSettingKey,
      addHTTPSettingDefaultValue
    );
    const addFolder = inject(addFolderKey, addFolderDefaultValue);

    const handleKeydown = (e: KeyboardEvent) => {
      if (hotKeyMatchCreateHTTPSetting(e)) {
        addHTTPSetting("");
        return;
      }
    };
    document.addEventListener("keydown", handleKeydown);
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleKeydown);
    });

    const handleImportPostman = async () => {
      try {
        const selected = await open({
          filters: [
            {
              name: "JSON",
              extensions: ["json"],
            },
          ],
        });
        if (!selected) {
          return;
        }
        const fileData = await readTextFile(selected as string);
        const json = JSON.parse(fileData);
        if (!Array.isArray(json.item)) {
          return;
        }
        const arr = json.item as [];

        await Promise.each(
          arr,
          async (item: {
            name: string;
            item: {
              name: string;
              request: {
                method: string;
                url: {
                  raw: string;
                };
                query: {
                  key: string;
                  value: string;
                }[];
                body: {
                  mode: string;
                  raw: string;
                };
              };
            }[];
          }) => {
            const folder = newDefaultAPIFolder();
            folder.collection = collection;
            folder.name = item.name;
            await folderStore.add(folder);
            if (!item.item) {
              return;
            }
            await Promise.each(item.item, async (apiItem) => {
              if (!apiItem.request) {
                return;
              }
              const setting = newDefaultAPISetting();
              setting.category = SettingType.HTTP;
              setting.collection = collection;
              setting.name = apiItem.name;

              let contentType = "";
              const body = apiItem.request.body?.raw;
              if (body && body.startsWith("{") && body.endsWith("}")) {
                contentType = ContentType.JSON;
              }
              const query: KVParam[] = [];
              apiItem.request.query?.forEach((q) => {
                query.push({
                  key: q.key,
                  value: q.value,
                  enabled: true,
                });
              });

              const req: HTTPRequest = {
                headers: [],
                method: apiItem.request.method,
                uri: apiItem.request.url?.raw || "",
                contentType,
                query,
                body: body,
              };
              setting.setting = JSON.stringify(req);
              await settingStore.add(setting);
              await folderStore.addChild({
                id: folder.id,
                child: setting.id,
                index: -1,
              });
            });
          }
        );
        message.info(i18nCollection("importPostmanSuccess"));
      } catch (err) {
        showError(message, err);
      }
    };

    return {
      addHTTPSetting,
      addFolder,
      handleImportPostman,
      text: {
        add: i18nCommon("add"),
        placeholder: i18nCollection("filterPlaceholder"),
      },
    };
  },
  render() {
    const options: DropdownMixedOption[] = [
      {
        label: `${i18nCollection(
          "newHTTPRequest"
        )} | ${hotKeyCreateHTTPSetting()}`,
        key: SettingType.HTTP,
        icon: () => (
          <NIcon>
            <AnalyticsOutline />
          </NIcon>
        ),
      },
      {
        label: `${i18nCollection("newFolder")} | ${hotKeyCreateFolder()}`,
        key: SettingType.Folder,
        icon: () => (
          <NIcon>
            <FolderOpenOutline />
          </NIcon>
        ),
      },
      {
        type: "divider",
        key: "divider",
      },
      {
        label: i18nCollection("importPostman"),
        key: importPostmanKey,
        icon: () => (
          <NIcon>
            <CloudUploadOutline />
          </NIcon>
        ),
      },
    ];
    const { text } = this;
    return (
      <NGrid xGap={12}>
        <NGi span={16}>
          <NInput
            type="text"
            clearable
            placeholder={text.placeholder}
            onInput={(value: string) => {
              this.$props.onFilter(value.toLowerCase());
            }}
          />
        </NGi>
        <NGi span={8}>
          <NDropdown
            class={addDropdownClass}
            trigger="click"
            options={options}
            renderLabel={(option) => {
              const arr = (option.label as string).split(" | ");
              const hotkey =
                arr.length === 2 ? (
                  <span class="hotKey">{arr[1]}</span>
                ) : undefined;

              return (
                <div class="label">
                  {arr[0]}
                  {hotkey}
                </div>
              );
            }}
            onSelect={(key: string) => {
              switch (key) {
                case SettingType.HTTP:
                  this.addHTTPSetting("");
                  break;
                case SettingType.Folder:
                  this.addFolder();
                  break;
                case importPostmanKey:
                  this.handleImportPostman();
                  break;
              }
            }}
          >
            <NButton class="widthFull">{text.add}</NButton>
          </NDropdown>
        </NGi>
      </NGrid>
    );
  },
});
