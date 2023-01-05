<script setup>
import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
  <div class="flex flex-col h-[100vh] w-full px-4 mt-[30vh]">
    <h4 class="text-3xl font-bold mb-4">Invoice List</h4>
    <table class="w-full border-[1px] border-black">
      <thead>
        <tr>
          <th width="9%" class="border-black p-2 border-[1px]">Invoice No</th>
          <th class="border-black p-2 border-[1px]">Subject</th>
          <th width="10%" class="border-black p-2 border-[1px]">Issue Date</th>
          <th width="10%" class="border-black p-2 border-[1px]">Due Date</th>
          <th width="20%" class="border-black p-2 border-[1px]">
            Total Amount
          </th>
          <th width="20%" class="border-black p-2 border-[1px]">Amount Paid</th>
          <th class="border-black p-2 border-[1px]">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center p-2 border-black border-[1px]">0001</td>
          <td class="p-2 border-black border-[1px]">
            Spring Marketing Campaign
          </td>
          <td class="text-center p-2 border-black border-[1px]">-</td>
          <td class="text-center p-2 border-black border-[1px]">-</td>
          <td class="p-2 border-black border-[1px] text-right">$9999</td>
          <td class="p-2 border-black border-[1px] text-right">$889</td>
          <td class="border-black border-[1px]">
            <div class="flex flex-col">
              <button class="p-2 bg-blue-300 rounded-xl m-2 text-white">
                Issued
              </button>
              <button class="p-2 bg-blue-300 rounded-xl m-2 text-white">
                Edit
              </button>
              <button class="p-2 bg-blue-300 rounded-xl m-2 text-white">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
