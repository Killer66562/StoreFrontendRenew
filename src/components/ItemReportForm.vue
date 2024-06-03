<script setup lang="ts">
import { ref } from 'vue';
import { CUItemReportSchema, FullItemSchema } from '../models';
import { ApiInstance } from '../api/apiInstance';
import { useToast } from 'vue-toast-notification';
import { getErrorMessage } from '../funcs';
import { useAsyncState } from '@vueuse/core';

const toast = useToast();

const props = defineProps<{
    item: FullItemSchema,
    invisible?: boolean
}>();

const data = ref<CUItemReportSchema>({
    reported_item_id: props.item.id,
    reason: ""
});

const resetData = () => {
    data.value = {
        reported_item_id: props.item.id,
        reason: ""
    }
}

const sendReport = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.post("/general/item_reports", data.value);
        resetData();
        toast.success("成功檢舉商品！");
    }
    catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
    }
}

const sendState = useAsyncState(() => sendReport(), undefined, { immediate: false });
</script>

<template>
    <form @submit.prevent="sendState.execute" @reset.prevent="resetData">
        <div class="row">
            <div class="mb-3">
                <label class="form-label">檢舉原因</label>
                <textarea class="form-control" rows="10" placeholder="請輸入檢舉原因" maxlength="200" required v-model="data.reason"></textarea>
            </div>
        </div>
        <div class="btn-group mb-3">
            <button type="submit" class="btn btn-success">送出檢舉</button>
            <button type="reset" class="btn btn-danger">重新填寫</button>
        </div>
    </form>
</template>