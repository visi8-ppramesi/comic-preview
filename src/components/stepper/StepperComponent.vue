<template>
  <div class="d-stepper">
    <div class="d-stepper-header flex justify-around">
      <div
        class="step-number-content text-center"
        :class="{ 'active': step == i }"
        v-for="(stepItem, i) in steps"
        :key="i"
      >
        <div
          class="step-number items-center justify-center mx-auto"
          :class="stepNumberClasses(i)"
        >
            <svg v-if="step > i" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="step === i && fatalError" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span v-else>{{ i + 1 }}</span>
        </div>
        <div class="mt-1 text-sm text-slate-400">{{ stepItem.name }}</div>
      </div>
    </div>

    <card
      class="my-4 overflow-hidden"
      bg-variant="light"
      no-body
      :class="{ 'border-danger': error, 'shake-error': shake }"
      v-loading="loading"
    >
      <div v-if="steps[step].icon" class="hidden sm:block">
        <i class="fas fa-fw fa-3x mr-4" :class="iconClasses"></i>
      </div>
      <div>
        <h3 class="font-bold">{{ steps[step].name }}</h3>
        <!-- <p class="text-slate-400">{{ steps[step].desc }}</p> -->

        <div v-if="!fatalError">
          <KeepAlive>
            <component
              :store="store"
              :step="step"
              :setState="setState"
              ref="step"
              :is="stepComponent"
              @loading="loadingAction"
              @error="errorHandler"
              @fatal-error="blockStepper"
              @can-continue="nextStepAction"
              @set-step="setStep"
              @disable-next="disableNext"
              @enable-next="enableNext"
              @rename-next-button="renameNextButton"
              @next-step="nextStep"
            />
          </KeepAlive>
        </div>
        <div v-else>{{ fatalErrorMsg }}</div>
      </div>
      <div v-if="error" class="text-red-400">{{ errorMessage }}</div>
    </card>
    
    <div class="flex flex-row w-full justify-between">
        <slot name="action-buttons">

        </slot>
        <div class="footer flex justify-end" v-if="!fatalError">
            <button
                variant="light"
                :disabled="loading"
                class="back-button flex text-xs lg:text-lg items-center p-2 rounded-lg text-gray-700"
                @click="backStep"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg> Back
            </button>

            <button
                v-if="!steps[step].confirm"
                variant="success"
                class="next-step-button disabled:bg-purple-300 disabled:text-gray-500 text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="nextStep()"
                :disabled="loading || nextDisabled"
            >
                {{nextButtonText}}
                <i class="fas fa-angle-double-right"></i>
            </button>
            <button
                v-else
                variant="success"
                class="confirm-button text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="$emit('confirm')"
                :disabled="loading || nextDisabled"
                >{{ steps[step].confirm }}</button
            >
        </div>
    </div>
  </div>
</template>

<script>
// import { markRaw } from 'vue'
import Card from "../Card.vue";
export default {
  name: "stepper-component",
  components: {
    Card,
  },
  emits: ['confirm', 'backStep'],
  props: {
    steps: { type: Array, default: () => [] },
    initialState: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      nextDisabled: false,
      store: {
        state: this.initialState,
        setState: this.setState,
        resetState: this.resetState,
      },
      step: 0,
      loading: false,
      error: false,
      errorMessage: '',
      fatalError: false,
      fatalErrorMsg: "",
      effect: "in-out-translate-fade",
      shake: false,
      nextButtonText: 'Next'
    };
  },
  computed: {
    activeStep() {
      return this.steps[this.step];
    },
    stepComponent() {
      return {...this.steps[this.step].component};
    },
    iconClasses() {
      if (!this.activeStep.icon) return "";
      else if (/\s/.test(this.activeStep.icon)) return this.activeStep.icon;
      return `fas ${this.activeStep.icon}`;
    },
  },
  methods: {
    renameNextButton(rename){
      this.nextButtonText = rename
    },
    test(){
      this.logger(this.stepComponent)
    },
    setStep(step) {
      if (step >= 1 && step <= this.steps.length) this.step = step - 1;
    },
    resetState() {
      this.step = 0
      this.error = false
      this.errorMessage = ''
      this.store.state = {
        ...this.initialState,
      };
    },
    setState(key, value) {
      this.store.state = {
        ...this.store.state,
        [key]: value,
      };
    },
    errorHandler(payload) {
      this.errorMessage = payload.message
      this.error = payload.status;
      this.shake = payload.status;
      setTimeout(() => {
        this.shake = !payload.status;
      }, 750);
    },
    blockStepper(msg) {
      this.resetParams();
      this.fatalErrorMsg = msg;
      this.fatalError = true;
    },
    resetParams() {
      this.error = false;
      this.loading = false;
      this.fatalErrorMsg = "";
      this.fatalError = false;
    },
    stepNumberClasses(i) {
      return {
        "bg-sky-800 text-white": this.step === i && !this.fatalError,
        "bg-sky-900 text-white": this.step > i && !this.fatalError,
        "bg-red-600 text-white": this.fatalError && this.step === i,
        "bg-sky-100 text-primary": this.step < i,
      };
    },
    async nextStep(pass = false) {
      if (!this.$refs.step.nextStep) return this.nextStepAction();

      const myNextStep = await this.$refs.step.nextStep(pass)

      if (myNextStep) {
        if (!this.loading) {
          this.nextStepAction();
        }
      }
    },
    disableNext(){
      this.nextDisabled = true
    },
    enableNext(){
      this.nextDisabled = false
    },
    nextStepAction() {
      this.effect = "in-out-translate-fade";
      this.resetParams();
      if (this.step < this.steps.length - 1) this.step++;
    },
    backStep() {
      this.$emit('backStep', this.step)
      this.effect = "out-in-translate-fade";
      this.resetParams();
      if (this.step > 0) this.step--;
    },
    loadingAction(status) {
      this.loading = status;
      //if (!status) this.nextStepAction();
    },
  },
};
</script>

<style>
.d-stepper .d-stepper-header {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.d-stepper .d-stepper-header::before {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #ddd;
  top: 20px;
  left: 0;
  content: " ";
}

.d-stepper .step-number {
  /* background: #e9e9e9; */
  border-radius: 50%;
  text-align: center;
  height: 40px;
  width: 40px;
  display: flex;
}
.d-stepper .step-number-content {
  transition: transform 0.2s;
  z-index: 2;
  width: 68px;
}

.d-stepper .step-number-content div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.d-stepper .step-number-content.active {
  transform: scale(1.25);
}

.in-out-translate-fade-enter-active,
.in-out-translate-fade-leave-active {
  transition: all 0.15s;
}
.in-out-translate-fade-enter,
.in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translateX(100px);
}
.in-out-translate-fade-leave-active {
  transform: translateX(-100px);
}

.out-in-translate-fade-enter-active,
.out-in-translate-fade-leave-active {
  transition: all 0.15s;
}
.out-in-translate-fade-enter,
.out-in-translate-fade-leave-active {
  opacity: 0;
}
.out-in-translate-fade-enter {
  transform: translateX(-100px);
}
.out-in-translate-fade-leave-active {
  transform: translateX(100px);
}
</style>
