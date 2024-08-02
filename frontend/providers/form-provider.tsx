import { UseFormReturn, FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

type FormProviderProps = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  id?: string;
  className?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  id,
  className,
}: FormProviderProps) {
  return (
    <Form {...methods}>
      <form id={id} onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
}
