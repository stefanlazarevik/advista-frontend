import classNames from 'classnames';
const ErrorText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return <p className={classNames('red', className)}>{text}</p>;
};
export default ErrorText;
