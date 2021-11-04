import { Ripple } from "primereact/ripple";
import { PrimeIcons } from "primereact/api";

const templateFactory = (
  buttonBorder,
  setButtonBorder,
  numberOfPage,
  setNumberOfPage,
  maximumNumberOfPages,
  requestData
) => {

  const template1 = {
    layout: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
    FirstPageLink: (options) => {
      return (
        <button
          type="button"
          className={PrimeIcons.ANGLE_DOUBLE_LEFT + " p-2"}
          onClick={async () => {
            await requestData(1);
            //setData(requestedData);
            setButtonBorder(0);
            setNumberOfPage(1);
          }}
        >
          <Ripple />
        </button>
      );
    },
  
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={PrimeIcons.ANGLE_LEFT + " p-2"}
          onClick={async (e) => {
            if (buttonBorder === 1) {
              await requestData(1);
              //setData(requestedData);
              setButtonBorder(0);
              setNumberOfPage(1);
            } else if (buttonBorder === 2 && numberOfPage === 1) {
              await requestData(2);
              //setData(requestedData);
              setButtonBorder(1);
              setNumberOfPage(1);
            } else if (
              buttonBorder === 2 &&
              numberOfPage >= 2 &&
              numberOfPage <= maximumNumberOfPages - 4
            ) {
              await requestData(numberOfPage + 1);
              //setData(requestedData);
              setButtonBorder(2);
              setNumberOfPage(numberOfPage - 1);
            } else if (buttonBorder === 3) {
              await requestData(
                maximumNumberOfPages - 2
              );
              //setData(requestedData);
              setButtonBorder(2);
              setNumberOfPage(maximumNumberOfPages - 4);
            } else if (buttonBorder === 4) {
              console.log("entró");
              await requestData(
                maximumNumberOfPages - 1
              );
              //setData(requestedData);
              setButtonBorder(3);
              setNumberOfPage(maximumNumberOfPages - 4);
            }
          }}
        >
          <Ripple />
        </button>
      );
    },
  
    PageLinks: (options) => {
      options.view = {
        startPage: 1,
        endPage: maximumNumberOfPages,
      };
  
      options.totalPages = maximumNumberOfPages;
  
      return (
        <>
          {[0, 1, 2, 3, 4].map((number) => {
            let borderString;
  
            if (buttonBorder === number) {
              borderString = "1px solid black";
            } else {
              borderString = "";
            }
  
            return (
              <button
                type="button"
                className={
                  "p-paginator-page p-paginator-element p-paginator-page-start p-paginator-page-end  bg-white "
                }
                style={{
                  border: borderString,
                }}
                onClick={async (e) => {
                  options.onClick(e);
  
                  console.log("options.className", options.className);
                  const currentPosition = e.target.innerText - numberOfPage;
                  const newNumberOfPage = numberOfPage + (currentPosition - 2);
  
                  let borderBox;
                  let newInitNumber;
  
                  if (
                    newNumberOfPage > 0 &&
                    newNumberOfPage < maximumNumberOfPages
                  ) {
                    newInitNumber = newNumberOfPage;
                    await requestData(
                      newNumberOfPage + 2
                    );
                    borderBox = 2;
                  } else if (newNumberOfPage <= 0) {
                    newInitNumber = 1;
                    await requestData(e.target.innerText);
                    borderBox = e.target.innerText - 1;
                  } else if (newNumberOfPage > maximumNumberOfPages - 4) {
                    newInitNumber = maximumNumberOfPages - 4;
                    await requestData(e.target.innerText);
                  }
  
                  //setData(requestedData);
                  setButtonBorder(borderBox);
                  setNumberOfPage(newInitNumber);
                }}
              >
                {numberOfPage + number}
                <Ripple />
              </button>
            );
          })}
        </>
      );
    },
  
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={PrimeIcons.ANGLE_RIGHT + " p-2"}
          onClick={async (e) => {
            if (buttonBorder === 0) {
              await requestData(2);
              console.log("PASA por next button con input value de 1")
              //setData(requestedData);
              setButtonBorder(1);
              setNumberOfPage(1);
            } else if (buttonBorder === 1 && numberOfPage === 1) {
              await requestData(3);
              //setData(requestedData);
              setButtonBorder(2);
              setNumberOfPage(1);
            } else if (buttonBorder === 2 && numberOfPage === 1) {
              await requestData(4);
              //setData(requestedData);
              setButtonBorder(2);
              setNumberOfPage(2);
            } else if (
              buttonBorder === 2 &&
              numberOfPage >= 2 &&
              numberOfPage <= maximumNumberOfPages - 4
            ) {
              await requestData(numberOfPage + 3);
              //setData(requestedData);
              setButtonBorder(2);
              setNumberOfPage(numberOfPage + 1);
            } else if (buttonBorder === 3) {
              await requestData(
                maximumNumberOfPages
              );
              //setData(requestedData);
              setButtonBorder(4);
              setNumberOfPage(maximumNumberOfPages - 4);
            }
          }}
        >
          <Ripple />
        </button>
      );
    },
  
    LastPageLink: (options) => {
      return (
        <button
          type="button"
          className={PrimeIcons.ANGLE_DOUBLE_RIGHT + " p-2"}
          onClick={async (e) => {
            await requestData(maximumNumberOfPages);
            //setData(requestedData);
            setButtonBorder(4);
            setNumberOfPage(maximumNumberOfPages - 4);
          }}
        >
          <Ripple />
        </button>
      );
    },
  };

  return template1;
}

export default templateFactory;
