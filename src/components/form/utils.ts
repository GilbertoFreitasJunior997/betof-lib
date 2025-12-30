import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { fieldComponents } from './fiedComponents';
import { formComponents } from './formComponents';

const formHookContexts = createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	formContext: formHookContexts.formContext,
	fieldContext: formHookContexts.fieldContext,
	fieldComponents: fieldComponents,
	formComponents: formComponents,
});

export const { useFieldContext, useFormContext } = formHookContexts;
