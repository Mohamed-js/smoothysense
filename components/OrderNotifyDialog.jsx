const NotifyDialog = ({ setDialogOpened, t }) => {
  return (
    <div className="fixed w-screen h-screen bg-gray-300/50 flex items-center justify-center top-0 left-0 z-50">
      <div className="w-64 rounded-lg bg-white p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-base font-bold">{t("notification")}</p>
          <span
            onClick={() => setDialogOpened(false)}
            className="cursor-pointer text-lg font-semibold border border-gray-300 rounded px-2"
          >
            ×
          </span>
        </div>

        <div className="flex flex-col justify-center items-center pb-2">
          <p className="text-center">{t("order_successfully")}</p>
        </div>
      </div>
    </div>
  );
};

export default NotifyDialog;
