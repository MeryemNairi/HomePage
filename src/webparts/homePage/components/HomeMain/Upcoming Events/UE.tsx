import * as React from 'react';
import Styles from './UE.module.scss';
import { UEItem, fetchUEData } from './UEService'; 
import { submitFeedback, IFeedbackData } from './FeedbackService'; 

const UE: React.FC = () => {
  const [UE, setEvents] = React.useState<UEItem[]>([]); 
  const [isTextAreaVisible, setIsTextAreaVisible] = React.useState<boolean[]>([]);
  const [feedback, setFeedback] = React.useState<string[]>([]);

  const handleOpinionClick = (index: number) => {
    const updatedVisibility = [...isTextAreaVisible];
    updatedVisibility[index] = true;
    setIsTextAreaVisible(updatedVisibility);
  };

  const handleFeedbackChange = (index: number, value: string) => {
    
    const updatedFeedback = [...feedback];
    updatedFeedback[index] = value;
    setFeedback(updatedFeedback);
  };

  const handleSubmitClick = async (index: number) => {
    const updatedVisibility = [...isTextAreaVisible];
    updatedVisibility[index] = false;
    setIsTextAreaVisible(updatedVisibility);

    const newFeedback: IFeedbackData = {
      comment: feedback[index],
      user: 'UserName', 
      date: new Date(),
    };

    try {
      await submitFeedback(newFeedback); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      alert('Merci pour votre opinion');
    }
  };


  React.useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await fetchUEData();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className={Styles.UE}>

      <div className={Styles.logo_holder}>
        <div className={Styles.logo_holder_img}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.0143 24.994H1.98571C1.69093 24.8675 1.36668 24.7868 1.10674 24.6092C0.305494 24.0549 0 23.2423 0 22.2925C0 16.5423 0 10.7921 0 5.0419C0 3.68036 0.943278 2.72514 2.3046 2.71707C2.84859 2.71438 3.38991 2.71707 3.9339 2.71707C4.01965 2.71707 4.1054 2.70899 4.20723 2.70361C4.20723 2.14931 4.20991 1.62192 4.20723 1.09184C4.20456 0.661314 4.40822 0.351875 4.78339 0.182356C4.99777 0.0854879 5.24698 0.0236 5.4828 0.0155277C6.07235 -0.00868931 6.66458 0.00476457 7.25681 0.0101461C8.00447 0.0155277 8.40375 0.427216 8.40375 1.18332C8.40375 1.6865 8.40375 2.18967 8.40375 2.7063H15.5989C15.5989 2.16546 15.5989 1.63807 15.5989 1.11067C15.6016 0.467578 15.9875 0.0370539 16.6226 0.0182185C17.2952 -0.00330775 17.9678 -0.00868931 18.6405 0.0182185C19.3828 0.047817 19.7928 0.505249 19.7928 1.23983C19.7928 1.41742 19.7928 1.5977 19.7928 1.7753C19.7928 2.08204 19.7928 2.3861 19.7928 2.71976C19.916 2.71976 20.0018 2.71976 20.0902 2.71976C20.6503 2.71976 21.2077 2.71438 21.7678 2.71976C23.0246 2.7359 23.9946 3.69382 23.9973 4.94503C24.0027 10.7598 24 16.5746 23.9973 22.392C23.9973 22.9302 23.8607 23.4333 23.5766 23.8989C23.2121 24.4935 22.6789 24.8379 22.0143 24.9967V24.994ZM22.7941 9.66734H1.2059C1.2059 9.75345 1.2059 9.80995 1.2059 9.86915C1.2059 14.0345 1.2059 18.1971 1.2059 22.3624C1.2059 22.4189 1.2059 22.4754 1.2059 22.5319C1.24341 23.3257 1.72041 23.7858 2.50558 23.7858C8.84859 23.7858 15.1916 23.7858 21.5373 23.7858C22.1778 23.7858 22.577 23.4872 22.7325 22.8683C22.778 22.6907 22.7914 22.4997 22.7914 22.314C22.7941 18.181 22.7914 14.0506 22.7914 9.91758C22.7914 9.83686 22.7914 9.75614 22.7914 9.66734H22.7941ZM19.7928 3.91715C19.7928 4.09743 19.7928 4.24812 19.7928 4.40149C19.7928 5.2168 19.2997 5.71459 18.477 5.72266C17.9008 5.72805 17.3274 5.72535 16.7512 5.72266C16.0598 5.71728 15.6016 5.25447 15.5962 4.55487C15.5962 4.34768 15.5962 4.14049 15.5962 3.93061H8.39839C8.39839 4.17816 8.40375 4.40956 8.39839 4.64366C8.37963 5.20873 7.94283 5.69576 7.39884 5.7119C6.71818 5.73343 6.03752 5.73612 5.35686 5.7119C4.67887 5.68768 4.20991 5.16298 4.20456 4.48222C4.20456 4.29924 4.20456 4.11358 4.20456 3.91984C3.4837 3.91984 2.80304 3.89832 2.12506 3.92792C1.59178 3.94944 1.20322 4.40418 1.20322 4.93965C1.20322 6.03748 1.20322 7.13532 1.20322 8.23316C1.20322 8.29505 1.21125 8.35693 1.21661 8.4242H22.7727C22.7807 8.38384 22.7914 8.36232 22.7914 8.3381C22.7914 7.18375 22.7995 6.02941 22.7914 4.87507C22.7861 4.35844 22.3412 3.93868 21.8079 3.91715C21.5989 3.90908 21.3872 3.91715 21.1755 3.91715C20.7253 3.91715 20.2724 3.91715 19.7928 3.91715ZM16.7566 1.22638V4.50374H18.5788V1.22369H16.7566V1.22638ZM5.4962 4.50374H7.1791V1.23176H5.4962V4.50105V4.50374Z" fill="white" />
            <path d="M8.12255 20.9261C8.2351 20.2911 8.35033 19.6345 8.46824 18.9807C8.52184 18.6766 8.57276 18.3726 8.63975 18.0712C8.67191 17.9178 8.62903 17.8156 8.51648 17.7106C7.86798 17.0971 7.23019 16.4702 6.58437 15.8567C6.37267 15.6576 6.2494 15.4288 6.33515 15.1409C6.42358 14.8449 6.6728 14.7508 6.95418 14.7077C7.84386 14.5786 8.73086 14.4386 9.62054 14.3149C9.77061 14.2933 9.84564 14.2261 9.90728 14.0969C10.3012 13.287 10.7032 12.4798 11.0944 11.6698C11.223 11.4034 11.3946 11.1963 11.7134 11.2043C12.0189 11.2097 12.1824 11.4088 12.3084 11.6698C12.6996 12.4798 13.1069 13.2843 13.4982 14.0942C13.5652 14.2368 13.6509 14.2933 13.8063 14.3149C14.7041 14.4413 15.5991 14.5786 16.4968 14.7158C16.7621 14.7562 16.9819 14.8638 17.0676 15.1382C17.1561 15.4208 17.0408 15.6441 16.8398 15.8352C16.1967 16.454 15.5589 17.0783 14.9077 17.6891C14.7711 17.8156 14.7389 17.9313 14.7711 18.1116C14.9345 18.9726 15.0953 19.8363 15.2347 20.7001C15.2641 20.8884 15.2481 21.1171 15.165 21.2813C15.0122 21.588 14.6639 21.6365 14.2941 21.4454C13.4955 21.031 12.6996 20.6167 11.9064 20.1915C11.7617 20.1135 11.6518 20.1081 11.5044 20.1861C10.6898 20.622 9.87244 21.0499 9.05243 21.4723C8.59151 21.7091 8.1038 21.4266 8.12255 20.9207V20.9261ZM9.54283 19.8794C10.1619 19.5457 10.7246 19.2471 11.2847 18.9349C11.5634 18.7789 11.8287 18.7735 12.11 18.9295C12.6192 19.2121 13.1337 19.4865 13.6482 19.7637C13.7072 19.796 13.7688 19.8175 13.8546 19.8525C13.7635 19.3063 13.7206 18.7842 13.5839 18.2865C13.4124 17.6649 13.5678 17.2236 14.0609 16.8146C14.4468 16.4917 14.7496 16.0693 15.09 15.6899C15.0819 15.7195 15.0149 15.6979 14.9452 15.6872C14.353 15.6037 13.7608 15.515 13.1659 15.4396C12.9167 15.4073 12.7505 15.2889 12.6406 15.0629C12.3673 14.5005 12.0859 13.9435 11.8072 13.3839C11.7778 13.3247 11.7402 13.2682 11.692 13.1847C11.3678 13.8359 11.0569 14.4494 10.7541 15.0683C10.6576 15.2674 10.5156 15.3939 10.2985 15.4262C10.0493 15.4638 9.80277 15.4934 9.55355 15.5311C9.11675 15.593 8.67995 15.6576 8.24314 15.7221C8.23242 15.7437 8.21903 15.7652 8.20831 15.7894C8.27262 15.8352 8.34497 15.8755 8.40393 15.932C8.82733 16.3356 9.24538 16.7446 9.6661 17.1483C9.87244 17.3447 9.95284 17.5734 9.88584 17.8532C9.86172 17.9474 9.851 18.0443 9.8376 18.1411C9.74381 18.7008 9.6527 19.2605 9.54819 19.8821L9.54283 19.8794Z" fill="white" />
          </svg>


        </div>
        <div className={Styles.text}>
          <p>Evénements à venir</p>
        </div>
      </div>
      <div className={Styles.sparation_line}>

      </div>
      <div className={Styles.Latest_news_holder}>
        {UE.map((UE, index) => (
          <div className={Styles.UE_content}>
            <div className={Styles.title}>
              <p>Latest news</p>
            </div>
            <div className={Styles.UE_title}>
              <p>
                {UE.Event}
              </p>

            </div>
            <div className={Styles.date}>
              <p> 06/06/2024</p>
            </div>
            <div className={Styles.UpEv_content}>
              <p>
                {UE.Desciption}  </p>
            </div>

            <div className={Styles.Opinion_holder}>
              {!isTextAreaVisible[index] && (
                <button className={Styles.Opinion_btn} onClick={() => handleOpinionClick(index)}>
                  <p>
                    Votre opinion compte
                  </p>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 3H13V5.5H4V8H10.3" stroke="white" stroke-width="0.2" />
                    <path d="M1 12.8887V2.37526C1 1.61572 1.67136 1 2.49952 1H12.9962C13.8244 1 14.4957 1.61572 14.4957 2.37526V9.25154C14.4957 10.0111 13.8244 10.6268 12.9962 10.6268H4.71975C4.26422 10.6268 3.83339 10.8167 3.54882 11.1429L1.80113 13.1465C1.53549 13.451 1 13.2788 1 12.8887Z" stroke="white" />
                  </svg>
                </button>
              )}
              {isTextAreaVisible[index] && (
                <div className={Styles.text_area}>
                  <div className={Styles.area_holder}>
                  <textarea
                      name="OpinionTextArea"
                      className={Styles.OpinionArea}
                      placeholder="Give us your honest feedback"
                      value={feedback[index] || ''}
                      onChange={(e) => handleFeedbackChange(index, e.target.value)}
                    ></textarea>
                  </div>
                  <div className={Styles.Submit_holder}>
                  <button className={Styles.submit} onClick={() => handleSubmitClick(index)}>
                  <svg className={Styles.submit_icon} width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 6.89114L1 12.7823L3.8125 6.89114L1 1L16 6.89114Z" fill="#044123" stroke="#00966C" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.76318 6.89111H16H3.76318Z" fill="#044123" />
                        <path d="M3.76318 6.89111H16" stroke="#00966C" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </button>
                  </div>
                </div>
              )}


            </div>
          </div>
        ))}

      </div>
      <div className={Styles.sparation_line}>

      </div>
      <div className={Styles.nav_holder}>

      </div>
    </div>
  );
};

export default UE;
