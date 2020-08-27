import '@/assets/scss/element/element-variables.scss'
import '@/assets/scss/element/element-reset.scss'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import {
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  Switch,
  Select,
  Option,
  Button,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Row,
  Col,
  Card,
  Cascader,
  ColorPicker,
  Loading,
  MessageBox,
  Message,
  Notification,
  Divider,
} from 'element-ui'

export default (Vue: any) => {
  Vue.use(Dialog)
  Vue.use(Autocomplete)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)
  Vue.use(Checkbox)
  Vue.use(Switch)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Button)
  Vue.use(Popover)
  Vue.use(Tooltip)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Card)
  Vue.use(Cascader)
  Vue.use(ColorPicker)
  Vue.use(Divider)
  Vue.use(Loading.directive)

  // https://vuejs.org/v2/cookbook/adding-instance-properties.html?#The-Context-of-Prototype-Methods

  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message

  // https://vuejs.org/v2/api/#Vue-component

  Vue.component(CollapseTransition.name, CollapseTransition)
}
