<template>
  <div class="m-10 p-5">
    <h4 class="text-3xl font-bold">Form new</h4>
    <br />
    <div class="flex">
      <div class="flex flex-col w-1/2">
        <label for="subject">Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          id="subject"
          class="bg-gray-100 rounded p-3"
          v-model="subject"
        />
        <br />
        <label for="from">From</label>
        <select
          id="from"
          class="
            bg-gray-100
            rounded
            p-[0.85rem]
            text-sm
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
          "
          v-model="from_destination_id"
        >
          <option selected value="">Choose a destination</option>
          <template v-for="(value, key) in selectToDest" :key="key">
            <option :value="value.id">
              {{ value.description }}
            </option>
          </template>
        </select>
      </div>
      &nbsp;
      <div class="flex flex-col w-1/2">
        <label for="percent_tax">Percent Tax</label>
        <input
          type="number"
          name="percent_tax"
          placeholder="Percent Tax"
          id="percent_tax"
          class="bg-gray-100 rounded p-3"
          v-model="percent_tax"
        />
        <br />
        <label for="to">To</label>
        <select
          id="to"
          class="
            bg-gray-100
            rounded
            p-[0.85rem]
            text-sm
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
          "
          v-model="to_destination_id"
        >
          <option selected value="">Choose a destination</option>
          <template v-for="(value, key) in selectToDest" :key="key">
            <option :value="value.id">
              {{ value.description }}
            </option>
          </template>
        </select>
      </div>
    </div>
    <br />
    <div>
      <div class="flex w-1/2">
        <div class="flex flex-col">
          <label for="qty">Quantity</label>
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            id="qty"
            class="bg-gray-100 rounded p-3"
            v-model="formQty"
          />
        </div>
        &nbsp;
        <div class="flex flex-col">
          <label for="service">Service</label>
          <select
            id="service"
            class="
              bg-gray-100
              rounded
              p-[0.85rem]
              text-sm
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
            "
            v-model="formService"
          >
            <option selected value="">Choose a service</option>
            <template v-for="(value, key) in selectService" :key="key">
              <option :value="value">
                {{ value.description }}
              </option>
            </template>
          </select>
        </div>
        &nbsp;
        <div class="flex flex-col">
          <div class="pt-6"></div>
          <button
            class="py-2 px-8 bg-blue-300 rounded text-white"
            @click="addToDetail"
          >
            +
          </button>
        </div>
        &nbsp;
        <div class="flex flex-col">
          <div class="pt-6"></div>
          <button
            class="py-2 w-[10vw] px-2 bg-blue-300 rounded text-white"
            @click="calculateTotal"
          >
            Check Total
          </button>
        </div>
      </div>
      <br />
      <table class="w-full border-[1px] border-black">
        <thead>
          <tr>
            <th class="border-black p-2 border-[1px]">Item Type</th>
            <th class="border-black p-2 border-[1px]">Description</th>
            <th class="border-black p-2 border-[1px]">Quantity</th>
            <th class="border-black p-2 border-[1px]">Unit Price</th>
            <th class="border-black p-2 border-[1px]">Amount</th>
            <th width="1%" class="border-black p-2 border-[1px]">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in detail" :key="key">
            <td class="text-center p-2 border-black border-[1px]">
              {{ nf(item, "service.service_type.description", "-") }}
            </td>
            <td class="text-center p-2 border-black border-[1px]">
              {{ nf(item, "service.description", "-") }}
            </td>
            <td class="text-center p-2 border-black border-[1px] text-right">
              {{ formatingNumber({ value: nf(item, "quantity", "0") }) }}
            </td>
            <td class="p-2 border-black border-[1px] text-right">
              ${{
                formatingNumber({ value: nf(item, "service.unit_price", "0") })
              }}
            </td>
            <td class="p-2 border-black border-[1px] text-right">
              ${{
                formatingNumber({
                  value: item.subAmount,
                })
              }}
            </td>
            <td class="border-black border-[1px] text-center">
              <button
                class="p-2 bg-blue-300 rounded-xl m-2 text-white w-1/2"
                @click="detail.splice(key, 1)"
              >
                -
              </button>
            </td>
          </tr>
          <tr>
            <td class="text-right pt-2" colspan="5">Subtotal</td>
            <td class="text-right pt-2">
              ${{ formatingNumber({ value: total_before_tax }) }}
            </td>
          </tr>
          <tr>
            <td class="text-right" colspan="5">Tax ({{ percent_tax }}%)</td>
            <td class="text-right">
              ${{ formatingNumber({ value: total_tax }) }}
            </td>
          </tr>
          <tr>
            <td class="text-right" colspan="5">Total Amount</td>
            <td class="text-right">
              ${{ formatingNumber({ value: total_after_tax }) }}
            </td>
          </tr>
          <tr>
            <td class="text-right pb-2" colspan="5">Payment</td>
            <td class="text-right pb-2">
              <input
                type="number"
                name="payment"
                placeholder="Payment"
                class="bg-gray-100 rounded p-3"
                v-model="total_payment"
              />
            </td>
          </tr>
          <tr>
            <td class="text-right border-t-[1px] border-black p-2" colspan="6">
              <button
                class="py-2 w-[10vw] px-2 bg-blue-300 rounded text-white"
                @click="router.go(-1)"
              >
                Back
              </button>
              &nbsp;
              <button
                class="py-2 w-[10vw] px-2 bg-blue-300 rounded text-white"
                @click="onSave"
              >
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal
      :is-open="isOpenAlert"
      :show-button-no="false"
      label=""
      :header="headerAlert"
      @hide-modal="(v) => (isOpenAlert = v)"
      @on-action="(v) => (isOpenAlert = false)"
    />
  </div>
</template>

<script setup>
import { getListDestinations } from "../service/mDestinationService";
import { getListServices } from "../service/mServicesService";
import { storeInvoice } from "../service/invoiceService";
import { nf, formatingNumber } from "../utils/helpers";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/commons/Modal.vue";

const router = useRouter();

const headerAlert = ref("Success");
const isOpenAlert = ref(false);

const subject = ref("");
const percent_tax = ref(0);
const from_destination_id = ref("");
const to_destination_id = ref("");
const detail = ref([]);

const formQty = ref(0);
const formService = ref("");

const total_before_tax = ref(0);
const total_after_tax = ref(0);
const total_tax = ref(0);
const total_payment = ref(0);

const selectFromDest = ref([]);
const selectToDest = ref([]);
const selectService = ref([]);

onMounted(async () => {
  const resultFrom = await getListDestinations();
  const resultService = await getListServices();

  selectService.value = resultService.data.data;

  selectToDest.value = resultFrom.data.data;
  selectFromDest.value = resultFrom.data.data;
});

const addToDetail = () => {
  detail.value.push({
    service: formService.value,
    quantity: formQty.value,
    subAmount: nf(formService.value, "unit_price", 0) * formQty.value,
  });
};

const calculateTotal = () => {
  if (detail.value.length === 0) {
    total_before_tax.value = 0;
    total_after_tax.value = 0;
    total_tax.value = 0;
  }
  detail.value.map((d) => {
    total_before_tax.value = total_before_tax.value + d.subAmount;
  });
  total_tax.value =
    percent_tax.value <= 0
      ? 0
      : (percent_tax.value / 100) * total_before_tax.value;
  total_after_tax.value = total_before_tax.value + total_tax.value;
};

const onSave = async () => {
  const payload = {
    from_destination_id: from_destination_id.value,
    to_destination_id: to_destination_id.value,
    subject: subject.value,
    percent_tax: percent_tax.value,
    total_payment: total_payment.value,
    detail: detail.value.map((item) => {
      return {
        quantity: item.quantity,
        m_service_id: item?.service?.id,
        price: item?.service?.unit_price,
      };
    }),
  };
  const { status } = await storeInvoice(payload);
  if ([400, 404].includes(status)) {
    headerAlert.value = "Failed Save. Please Fill Form";
  } else if (status === 500) {
    headerAlert.value = "Failed Internal Server Error";
  }
  isOpenAlert.value = true;
  if ([200, 201].includes(status)) {
    setTimeout(() => {
        router.go(-1);
    }, 900);
  }
};
</script>
