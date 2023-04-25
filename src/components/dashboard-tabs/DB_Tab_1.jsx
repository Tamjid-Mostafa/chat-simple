import addIcon from "../../assets/iconadd.png";
const DB_Tab_1 = () => {
  return (
    <div className='dashboard_tab'>
        <div className='dashboard_tab__profile__info'>
            <h1>Hello Andrea!</h1>
            <div className='dashboard_tab__profile__info__combo'>
                <p>4 connected channels</p>
                <p>127 contacts</p>
            </div>
        </div>
        <div className='dashboard_tab__channels__info'>
            <div className='dashboard_tab__channels__info__combo'>
                <h2>Active Channels</h2>
                <div className='dashboard_tab__channels__info__add__btn add_button'>
                    <img src = {addIcon} alt="add" />
                    <p>Add Channel</p>
                </div>
            </div>
            <div className='dashboard_tab__channels__combo'>
            </div>
        </div>
        <div className='dashboard_tab__reports__info'>
        </div>
    </div>
  )
}

export default DB_Tab_1