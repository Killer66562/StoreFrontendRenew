<script setup lang="ts">
import { ItemQuerySchema, OptionValueText } from '../models';
import { ref } from 'vue';
import { useUserDataStore } from '../stores';

const userStore = useUserDataStore();

const props = defineProps<{
    query: ItemQuerySchema,
    opts: OptionValueText[]
}>();

const emits = defineEmits<{
    orderByChanged: [any],
    nameChanged: [any],
    descChanged: [boolean],
    need18Changed: [boolean]
}>();

const queryOrderByRef = ref<string | undefined>(props.query.order_by);
const queryDescRef = ref<boolean>(props.query.desc);
const queryNeed18Ref = ref<boolean>(props.query.need18)

const queryDescChanged = () => {
    emits('descChanged', queryDescRef.value);
}

const queryOrderByChanged = () => {
    emits('orderByChanged', queryOrderByRef.value);
}

const queryNeed18Changed = () => {
    emits('need18Changed', queryNeed18Ref.value);
}
</script>

<template>
    <div class="d-flex flex-row justify-content-end mb-3">
        <div class="me-3">
            <label class="form-label">倒序</label>
            <input type="checkbox" class="form-check-input" v-model="queryDescRef" @change="queryDescChanged">
        </div>
        <div class="me-3" v-if="userStore.userData">
            <label class="form-label">顯示18禁商品</label>
            <input type="checkbox" class="form-check-input" v-model="queryNeed18Ref" @change="queryNeed18Changed">
        </div>
        <div class="me-3">
            <label class="form-label">排序方式</label>
        </div>
        <div>
            <select class="form-select" v-model="queryOrderByRef" @change="queryOrderByChanged">
                <option v-for="opt, idx in opts" :key="idx" :value="opt.value" :selected="idx == 0">{{ opt.text }}</option>
            </select>
        </div>
    </div>
</template>