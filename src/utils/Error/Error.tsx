import classNames from 'classnames';

const ErrorText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <p className={classNames('font-semibold text-red-700', className)}>
      {text}
    </p>
  );
};
export default ErrorText;
