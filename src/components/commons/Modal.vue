<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" @close="$emit('hideModal', false)" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                w-full
                max-w-md
                transform
                overflow-hidden
                rounded-2xl
                bg-white
                p-6
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ props.header }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ props.label }}
                </p>
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  v-if="props.showButtonNo"
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    rounded-md
                    border border-transparent
                    bg-blue-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500
                    focus-visible:ring-offset-2
                  "
                  @click="$emit('hideModal', false)"
                >
                  No!
                </button>
                <button
                  type="button"
                  class="
                    ml-2
                    inline-flex
                    justify-center
                    rounded-md
                    border border-transparent
                    bg-blue-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500
                    focus-visible:ring-offset-2
                  "
                  @click="$emit('onAction', false)"
                >
                  Yes!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  label: {
    type: String,
    default: "Delete this item",
  },
  header: {
    type: String,
    default: "Are you sure?",
  },
  showButtonNo: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>
