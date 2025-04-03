type FormProps = {
  children: React.ReactNode;
  action?: (FormData: FormData) => void;
  onSubmit?: () => void;
};

function Form({ children, action, onSubmit }: FormProps) {
  return (
    <form action={action} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
