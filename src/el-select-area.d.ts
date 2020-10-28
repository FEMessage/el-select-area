import Vue, {VueConstructor} from 'vue'

declare module '@femessage/el-select-area' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type ElSelectAreaData = {}

  type ElSelectAreaMethods = {}

  type ElSelectAreaComputed = {}

  type ElSelectAreaProps = {
    value: any[]
    type: 'code' | 'text' | 'all'
    placeholders: any[]
    level: number
    data: object
    autoFill: boolean
  }

  type ElSelectArea = Combined<
    ElSelectAreaData,
    ElSelectAreaMethods,
    ElSelectAreaComputed,
    ElSelectAreaProps
  >

  export interface ElSelectAreaType extends FemessageComponent, ElSelectArea {}

  const ElSelectAreaConstruction: ExtendedVue<
    Vue,
    ElSelectAreaData,
    ElSelectAreaMethods,
    ElSelectAreaComputed,
    ElSelectAreaProps
  >

  export default ElSelectAreaConstruction
}
