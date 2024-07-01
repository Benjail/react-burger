import styles from './order-details.module.css';
import doneImage from '../../../images/done.png'; 
  
function OrderDetails() {
  return (
    <>
        <div className={'text_type_digits-large mt-5'} >
            034536
        </div>
        <div className={`text_type_main-medium mt-8`}>
            идентификатор заказа
        </div>
        <img src={doneImage} className={`${styles.order_image} mt-15`} alt='Order completed' />
        <div className='text_type_main-small mt-15'>Ваш заказ начали готовить</div>
        <div className={`${styles.order_message} text_type_main-small mt-2`}>
            Дождитесь готовности на орбитальной станции
        </div>
    </>
  );
}
export default OrderDetails;