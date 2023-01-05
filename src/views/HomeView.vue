<template>
  <div>
    <div class="flex flex-col h-[100vh] w-full px-4 mt-[30vh]">
      <h4 class="text-3xl font-bold mb-4">Invoice List</h4>
      <div class="w-1/2">
        <button
          class="p-2 bg-blue-300 rounded-xl m-2 text-white"
          @click="() => router.push({ name: 'new' })"
        >
          Add New
        </button>
      </div>
      <table class="w-full border-[1px] border-black">
        <thead>
          <tr>
            <th width="9%" class="border-black p-2 border-[1px]">Invoice No</th>
            <th class="border-black p-2 border-[1px]">Subject</th>
            <th width="10%" class="border-black p-2 border-[1px]">
              Issued Date
            </th>
            <th width="10%" class="border-black p-2 border-[1px]">Due Date</th>
            <th width="20%" class="border-black p-2 border-[1px]">
              Total Before Tax
            </th>
            <th width="20%" class="border-black p-2 border-[1px]">Total Tax</th>
            <th width="20%" class="border-black p-2 border-[1px]">
              Total After Tax
            </th>
            <th width="20%" class="border-black p-2 border-[1px]">
              Amount Paid
            </th>
            <th width="20%" class="border-black p-2 border-[1px]">
              Paid/Unpaid
            </th>
            <th class="border-black p-2 border-[1px]">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in invoiceList" :key="key">
            <td class="text-center p-2 border-black border-[1px]">
              {{ nf(item, "invoice_no", "-") }}
            </td>
            <td class="p-2 border-black border-[1px]">
              {{ nf(item, "subject", "-") }}
            </td>
            <td class="text-center p-2 border-black border-[1px]">
              {{ nf(item, "date_issued", "-") }}
            </td>
            <td class="text-center p-2 border-black border-[1px]">
              {{ nf(item, "due_date", "-") }}
            </td>
            <td class="p-2 border-black border-[1px] text-right">
              ${{
                formatingNumber({ value: nf(item, "total_before_tax", "0") })
              }}
            </td>
            <td class="p-2 border-black border-[1px] text-right">
              ${{ formatingNumber({ value: nf(item, "total_tax", "0") }) }}
            </td>
            <td class="p-2 border-black border-[1px] text-right">
              ${{
                formatingNumber({ value: nf(item, "total_after_tax", "0") })
              }}
            </td>
            <td class="p-2 border-black border-[1px] text-right">
              ${{ formatingNumber({ value: nf(item, "total_payment", "0") }) }}
            </td>
            <td :class="`p-2 border-black border-[1px] text-center ${item.flag_paid ? 'text-green-500' : 'text-red-400'}`" >
              {{ item.flag_paid ? "Paid" : "Unpaid" }}
            </td>
            <td class="border-black border-[1px]">
              <div class="flex flex-col">
                <button
                  v-if="!item.date_issued"
                  class="p-2 bg-blue-300 rounded-xl m-2 text-white"
                  @click="setDataIssued(item)"
                >
                  Issued
                </button>
                <button
                  class="p-2 bg-blue-300 rounded-xl m-2 text-white"
                  @click="setDataPaid(item)"
                >
                  Paid/Unpaid
                </button>
                <button
                  class="p-2 bg-blue-300 rounded-xl m-2 text-white"
                  @click="router.push(`/edit/${item.id}`)"
                >
                  Edit
                </button>
                <button
                  class="p-2 bg-blue-300 rounded-xl m-2 text-white"
                  @click="setDataDelete(item)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal
      :is-open="isOpenIssued"
      label="Issued this item"
      @hide-modal="(v) => showHideModal('issued', v)"
      @on-action="(v) => handleActionIssued()"
    />
    <Modal
      :is-open="isOpenDelete"
      @hide-modal="(v) => showHideModal('delete', v)"
      @on-action="(v) => handleActionDelete()"
    />

    <Modal
      :is-open="isOpenPaid"
      :label="labelPaid"
      @hide-modal="(v) => showHideModal('paid', v)"
      @on-action="(v) => handleActionPaid()"
    />

    <Modal
      :is-open="isOpenAlert"
      :show-button-no="false"
      label=""
      :header="headerAlert"
      @hide-modal="(v) => showHideModal('alert', v)"
      @on-action="(v) => showHideModal('alert', false)"
    />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/commons/Modal.vue";
import {
  deleteInvoice,
  flagPaidInvoice,
  getListInvoices,
  issuedInvoice,
} from "../service/invoiceService";
import { nf, formatingNumber } from "../utils/helpers";

const router = useRouter();

const isOpenIssued = ref(false);
const isOpenDelete = ref(false);
const isOpenAlert = ref(false);
const isOpenPaid = ref(false);
const headerAlert = ref("Success");

const selectedId = ref(null);
const selectedFlagPaid = ref(null);
const labelPaid = ref("");

const invoiceList = ref([]);

onMounted(async () => {
  await fetchList();
});

function showHideModal(flag = "issued", value = false) {
  if (flag === "issued") {
    isOpenIssued.value = value;
  } else if (flag === "delete") {
    isOpenDelete.value = value;
  } else if (flag === "alert") {
    isOpenAlert.value = value;
  } else if (flag === "paid") {
    isOpenPaid.value = value;
  }
}

const fetchList = async () => {
  const { data } = await getListInvoices();

  invoiceList.value = data.data;
};

const resetStateTemp = () => {
  selectedId.value = null;
  selectedFlagPaid.value = null;
};

const setSelectedId = (item) => {
  selectedId.value = item.id;
};

const setDataIssued = (item) => {
  resetStateTemp();
  setSelectedId(item);
  showHideModal("issued", true);
};

const setDataDelete = (item) => {
  resetStateTemp();
  setSelectedId(item);
  showHideModal("delete", true);
};

const setDataPaid = (item) => {
  resetStateTemp();
  setSelectedId(item);
  selectedFlagPaid.value = item.flag_paid;
  labelPaid.value = !item.flag_paid ? "Is Paid?" : "Is Unpaid?";
  showHideModal("paid", true);
};

const handleActionPaid = async () => {
  const flagPaid = !selectedFlagPaid.value;
  console.log("selectedId.value", selectedId.value);
  await flagPaidInvoice(flagPaid, selectedId.value);
  showHideModal("paid", false);
  await fetchList();
  showHideModal("alert", true);
};

const handleActionIssued = async (v) => {
  await issuedInvoice(selectedId.value);
  showHideModal("issued", false);
  await fetchList();
  showHideModal("alert", true);
};

const handleActionDelete = async (v) => {
  await deleteInvoice(selectedId.value);
  showHideModal("delete", false);
  await fetchList();
  showHideModal("alert", true);
};
</script>