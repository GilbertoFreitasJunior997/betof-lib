import type { FormEvent } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '../button';
import type { ButtonProps } from '../button/types';
import { FormRootProvider } from './providers';
import type { FormGroupProps, FormLegendProps, FormRootProps } from './types';
import { useFormContext } from './utils';

export const FormRoot = ({
	form,
	className,
	children,
	isLoading,
}: FormRootProps) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<form.AppForm>
			<FormRootProvider isLoading={isLoading}>
				<form
					onSubmit={handleSubmit}
					className={cn('flex flex-col overflow-hidden grow', className)}
				>
					{children}
				</form>
			</FormRootProvider>
		</form.AppForm>
	);
};

export const FormGroup = ({ className, ...props }: FormGroupProps) => {
	return (
		<div
			data-slot='field-group'
			className={cn(
				'group/field-group @container/field-group flex w-full flex-col gap-4 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
				className,
			)}
			{...props}
		/>
	);
};

export const FormLegend = ({
	className,
	variant = 'legend',
	...props
}: FormLegendProps) => {
	return (
		<legend
			data-slot='field-legend'
			data-variant={variant}
			className={cn(
				'-mb-1 font-medium',
				'data-[variant=legend]:text-base',
				'data-[variant=label]:text-sm',
				className,
			)}
			{...props}
		/>
	);
};

export const FormSubmitButton = (props: ButtonProps) => {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				canSubmit: state.canSubmit,
			})}
			children={({ isSubmitting, canSubmit }) => {
				const isDisabled = isSubmitting || props.disabled || !canSubmit;

				return (
					<Button
						type='submit'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							if (isDisabled) {
								return;
							}

							form.handleSubmit();
						}}
						{...props}
						disabled={isDisabled}
					>
						{props.children ?? 'Submit'}
					</Button>
				);
			}}
		/>
	);
};
