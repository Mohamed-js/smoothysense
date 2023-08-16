import MultiStep from "react-multistep";

const Hair = () => {
  return (
    <div className="multistep-container">
      <MultiStep
        stepCustomStyle={{ color: "limegreen" }}
        showTitles={false}
        title={"Hair Quiz"}
        activeStep={0}
        prevButton={{ title: "Back", style: { background: "gray" } }}
        nextButton={{ title: "Continue", style: { background: "limegreen" } }}
      >
        <Step title={"What is your hair type?"} />
        <Step title={"What do you like the most?"} />
      </MultiStep>
    </div>
  );
};

export default Hair;

const Step = ({ title }) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="flex gap-3 w-full py-5">
        <Answer title={"asd"} hasImage />
        <Answer title={"asd"} hasImage />
      </div>
    </>
  );
};

const Answer = ({ title, hasImage }) => {
  const style = {
    width: "100%",
    aspectRatio: "1/1",
    padding: "0.5rem",
    cursor: "pointer",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  if (hasImage) {
    style["background"] =
      "url('https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')";
  }
  return (
    <>
      <div style={style}>
        <h2>{title}</h2>
      </div>
    </>
  );
};
