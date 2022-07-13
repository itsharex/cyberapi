import {
  NButton,
  NCard,
  NDropdown,
  NEllipsis,
  NGi,
  NGrid,
  NH3,
  NIcon,
  NInput,
  useDialog,
  useMessage,
} from "naive-ui";
import { defineComponent, onBeforeMount } from "vue";
import { css } from "@linaria/core";
import {
  CreateOutline,
  ListOutline,
  SearchOutline,
  SwapVerticalOutline,
  TrashOutline,
} from "@vicons/ionicons5";

import { i18nCommon, i18nDashboard } from "../i18n";
import { padding } from "../constants/style";
import ExDialog from "../components/ExDialog";
import { useAPICollectionsStore } from "../stores/api_collection";
import {
  APICollection,
  newDefaultAPICollection,
} from "../commands/api_collection";
import { showError } from "../helpers/util";
import { storeToRefs } from "pinia";
import ExLoading from "../components/ExLoading";
import { ExFormItem } from "../components/ExForm";

const dashboardClass = css`
  padding: ${2 * padding}px;
`;
const collecitonDescriptionClass = css`
  height: 60px;
`;

enum HandleKey {
  Modify = "modify",
  Delete = "delete",
}

export default defineComponent({
  name: "DashBoard",
  setup() {
    const message = useMessage();
    const dialog = useDialog();
    const store = useAPICollectionsStore();
    const { apiCollections, fetching } = storeToRefs(store);

    const getFormItems = (): ExFormItem[] => {
      return [
        {
          key: "name",
          label: i18nCommon("name"),
          placeholer: i18nCommon("namePlaceholder"),
          rule: {
            required: true,
            message: i18nCommon("nameRequireError"),
            trigger: "blur",
          },
        },
        {
          key: "description",
          label: i18nCommon("description"),
          placeholer: i18nCommon("descriptionPlaceholder"),
          inputType: "textarea",
        },
      ];
    };

    const createCollection = () => {
      ExDialog({
        dialog,
        title: i18nDashboard("newCollection"),
        formItems: getFormItems(),
        onConfirm: async (data) => {
          try {
            const colleciton = newDefaultAPICollection();
            Object.assign(colleciton, data);
            await store.add(colleciton);
          } catch (err) {
            showError(message, err);
          }
        },
      });
    };

    onBeforeMount(async () => {
      try {
        await store.fetch();
      } catch (err) {
        showError(message, err);
      }
    });

    const handleCollection = (collection: APICollection, key: string) => {
      switch (key) {
        case HandleKey.Modify:
          {
            const formItems = getFormItems();
            formItems.forEach((item) => {
              const value = collection[item.key];
              if (value) {
                item.defaultValue = value as string;
              }
            });
            ExDialog({
              dialog,
              title: i18nDashboard("updateCollection"),
              formItems,
              onConfirm: async (data) => {
                try {
                  await store.update(Object.assign(collection, data));
                } catch (err) {
                  showError(message, err);
                }
              },
            });
          }
          break;
        case HandleKey.Delete:
          {
            dialog.warning({
              title: i18nDashboard("deleteCollection"),
              content: i18nDashboard("deleteCollectionContent"),
              positiveText: i18nCommon("confirm"),
              onPositiveClick: () => {
                message.success("Sure");
              },
            });
          }
          break;
      }
    };

    return {
      createCollection,
      fetching,
      apiCollections,
      handleCollection,
      sortOptions: [
        {
          label: "lastModified",
          key: "lastModified",
        },
      ],
    };
  },
  render() {
    const {
      sortOptions,
      createCollection,
      fetching,
      apiCollections,
      handleCollection,
    } = this;
    const slots = {
      suffix: () => (
        <NIcon>
          <SearchOutline />
        </NIcon>
      ),
    };

    const header = (
      <NGrid>
        <NGi span={8}>
          <NH3>{i18nCommon("dashboard")}</NH3>
        </NGi>
        <NGi span={16}>
          <NGrid xGap={10}>
            <NGi span={15}>
              <NInput
                clearable
                v-slots={slots}
                placeholder={i18nCommon("keywordFilterPlaceholder")}
              />
            </NGi>
            <NGi span={3}>
              <NDropdown class={"widthFull"} options={sortOptions}>
                <NButton class={"widthFull"}>
                  <NIcon>
                    <SwapVerticalOutline />
                  </NIcon>
                </NButton>
              </NDropdown>
            </NGi>
            <NGi span={6}>
              <NButton
                class={"widthFull"}
                onClick={() => {
                  createCollection();
                }}
              >
                {i18nCommon("create")}
              </NButton>
            </NGi>
          </NGrid>
        </NGi>
      </NGrid>
    );

    let collecitons = <ExLoading />;
    if (!fetching) {
      const options = [
        {
          label: i18nCommon("modify"),
          key: HandleKey.Modify,
          icon: () => (
            <NIcon>
              <CreateOutline />
            </NIcon>
          ),
        },
        {
          label: i18nCommon("delete"),
          key: HandleKey.Delete,
          icon: () => (
            <NIcon>
              <TrashOutline />
            </NIcon>
          ),
        },
      ];
      const arr = apiCollections.map((item) => {
        const slots = {
          "header-extra": () => (
            <NDropdown
              options={options}
              trigger="click"
              onSelect={(key) => {
                handleCollection(item, key);
              }}
            >
              <NButton quaternary>
                <NIcon>
                  <ListOutline />
                </NIcon>
              </NButton>
            </NDropdown>
          ),
        };
        return (
          <NGi>
            <NCard title={item.name} v-slots={slots} hoverable>
              <div class={collecitonDescriptionClass}>
                <NEllipsis lineClamp={3}>{item.description}</NEllipsis>
              </div>
            </NCard>
          </NGi>
        );
      });
      collecitons = (
        <NGrid
          cols={"2 s:3 m:4 l:5 xl:6 2xl:7"}
          responsive={"screen"}
          xGap={20}
          yGap={20}
        >
          {arr}
        </NGrid>
      );
    }

    return (
      <div class={dashboardClass}>
        {header}
        <div>{collecitons}</div>
      </div>
    );
  },
});
