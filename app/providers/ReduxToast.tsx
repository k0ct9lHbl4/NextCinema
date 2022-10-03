import ReduxToastrLib from "react-redux-toastr";

const ReduxToast: React.FC = () => {
  return (
    <ReduxToastrLib
      newestOnTop={false}
      preventDuplicates
      progressBar
      closeOnToastrClick
      timeOut={4000}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  );
};

export default ReduxToast;
