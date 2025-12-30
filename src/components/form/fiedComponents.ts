import { Checkbox } from '@/components/checkbox';
import { FormInputWrapper } from '@/components/form-input-wrapper';
import { NumberInput } from '@/components/number-input';
import { SelectInput } from '@/components/select-input';
import { SelectMultipleInput } from '@/components/select-multiple-input';
import { TextArea } from '@/components/text-area-input';
import { TextInput } from '@/components/text-input';


export const fieldComponents = {
  Checkbox: FormInputWrapper(Checkbox),
  TextInput: FormInputWrapper(TextInput),
  SelectInput: FormInputWrapper(SelectInput),
  TextArea: FormInputWrapper(TextArea),
  NumberInput: FormInputWrapper(NumberInput),
  SelectMultipleInput: FormInputWrapper(SelectMultipleInput),
} as const