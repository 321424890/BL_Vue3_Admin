<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <!-- <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button size="mini" circle icon="el-icon-search" @click="toggleSearch()" />
      </el-tooltip> -->
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button
          size="mini"
          circle
          icon="el-icon-refresh"
          @click="refresh()"
        />
      </el-tooltip>
      <!-- <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button size="mini" circle icon="el-icon-menu" @click="showColumn()" v-if="showColumnsType == 'transfer'"/>
        <el-dropdown trigger="click" :hide-on-click="false" style="padding-left: 12px" v-if="showColumnsType == 'checkbox'">
          <el-button size="mini" circle icon="el-icon-menu" />
          <el-dropdown-menu slot="dropdown">
            <template v-for="item in columns">
              <el-dropdown-item :key="item.key">
                <el-checkbox :checked="item.visible" @change="checkboxChange($event, item.label)" :label="item.label" />
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip> -->
    </el-row>
    <!-- <el-dialog :title="title" :visible.sync="open" append-to-body> -->
    <!-- <el-transfer
        :titles="['显示', '隐藏']"
        v-model="value"
        :data="columns"
        @change="dataChange"
      ></el-transfer> -->
    <!-- </el-dialog> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

export default defineComponent({
  name: "RightToolbar",
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array as PropType<Column[]>,
      default: () => [],
    },
    search: {
      type: Boolean,
      default: true,
    },
    showColumnsType: {
      type: String as PropType<"transfer" | "checkbox">,
      default: "checkbox",
    },
    gutter: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    // 显隐数据
    const value = ref<number[]>([]);
    // 弹出层标题
    const title = ref<string>("显示/隐藏");
    // 是否显示弹出层
    const open = ref<boolean>(false);

    // 右侧样式
    const style = computed(() => {
      const ret: Record<string, string> = {};
      if (props.gutter) {
        ret.marginRight = `${props.gutter / 2}px`;
      }
      return ret;
    });

    // transfer模式下初始化隐藏列
    if (props.showColumnsType === "transfer" && props.columns) {
      for (let i = 0; i < props.columns.length; i++) {
        if (props.columns[i].visible === false) {
          value.value.push(i);
        }
      }
    }

    // 切换搜索
    const toggleSearch = () => {
      emit("update:showSearch", !props.showSearch);
    };
    // 刷新
    const refresh = () => {
      emit("queryTable");
    };
    // transfer模式下数据变化
    const dataChange = (data: number[]) => {
      if (props.columns) {
        for (let i = 0; i < props.columns.length; i++) {
          const key = props.columns[i].key;
          props.columns[i].visible = !data.includes(i);
        }
      }
    };
    // 打开显示隐藏列dialog
    const showColumn = () => {
      open.value = true;
    };
    // checkbox模式下切换
    const checkboxChange = (event: boolean, label: string) => {
      if (props.columns) {
        const col = props.columns.find((item) => item.label === label);
        if (col) col.visible = event;
      }
    };

    return {
      value,
      title,
      open,
      style,
      toggleSearch,
      refresh,
      dataChange,
      showColumn,
      checkboxChange,
    };
  },
});
</script>
<style lang="scss" scoped>
::v-deep .el-transfer__button {
  border-radius: 50%;
  padding: 12px;
  display: block;
  margin-left: 0px;
}
::v-deep .el-transfer__button:first-child {
  margin-bottom: 10px;
}
</style>
