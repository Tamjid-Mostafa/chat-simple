import cancelIcon from "../../assets/cancel.jpg";
import messengerIcon from "../../assets/messenger.png";
import clockIcon from "../../assets/tt.png";

const Chatbot_tab_3 = ({changeChatbotTab}) => {
    return (
        <div className='dashboard_tab chatbot_tab'>
            <div>
                <h1>Chatbot</h1>
                <p className="smaller__heading">0 custom chatbots</p>
            </div>
            <div className="chatbot__tab3__main chatbot__tab2__main">
                <div className='header'>
                    <div className="header__left">
                    What are your chatbots capibilities?
                    </div>
                    <div className="header__right"onClick={()=>changeChatbotTab(2)} >
                        <img src={cancelIcon} alt="add" />
                    </div>
                </div>
                <div className="chat__conversations">
                    <div className="chat__conversation__card chat__conversation__tab3">
                        <img src={messengerIcon} alt="mess" />
                        <p>Answer FAQ questions</p>
                    </div>
                    <div className="chat__conversation__card">
                        <img src={messengerIcon} alt="m" />
                        <p>Create a bussiness small talk</p>
                    </div>
                </div>
                <div className="chatbot__tab3__footer">
                    <h3>Tell us about your business</h3>
                    <p>ChatSimple uses technology to create FAQ automatically. Start generating a list of FAQ by inputing an URL where you would like answers to created from.</p>
                    <div className="chatbot__tab3__time">
                        <h4>Enter opening and closing hours</h4>
                        <div className="chatbot__tab3__time__boxes">
                            <div>
                                <p>hh:mm:ss</p>
                                <img src={clockIcon} alt="clock" />
                            </div>
                            <div>
                                <p>hh:mm:ss</p>
                                <img src={clockIcon} alt="clock" />
                            </div>
                        </div>
                    </div>
                    <div className="chatbot__tab3__questions">
                        <h3>Answer the following questions</h3>
                        <input placeholder="Where do you source material?" />
                        <input placeholder="Do you have discounts?" />
                        <input placeholder="Do you deliver internationally?" />
                        <input placeholder="How can I contact customer service?" />
                        <div className="chatbot__tab3__questions__btn" onClick={()=>changeChatbotTab(1)} >
                            Next
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chatbot_tab_3