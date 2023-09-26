import React from "react";

import classes from './Faq.module.css';

const Faq = () => {

    return (
        <div className={classes.faq}>
            <h2 className={classes.faq__title}>Спасибо за заказ !</h2>
            <div className={classes.faq__line}></div>
            <p className={classes.faq__text}>Часто задаваемые вопросы по поводу заказов :</p>
            <p className={classes.faq__text}>Чек присылает тинькофф автоматически , но при оплате надо поставить галочку что бы его выслали.</p>
            <p className={classes.faq__text}>Ответное письмо - Временно отключено</p>
            <p className={classes.faq__text}>(приходит спустя час ! Может попасть в спам ! )</p>
            <p className={classes.faq__text}>Если оплата прошла - заказ создан.</p>
            <div className={classes.faq__line}></div>
            <p className={classes.faq__text}>1) Когда отправят заказ ?</p>
            <p className={classes.faq__text}>- Сроки отправки заказа - в течение 7-14 дней. (БЕЗ УЧЕТА ВЫХОДНЫХ)</p>
            <p className={classes.faq__text}>- Курьерская доставка - ЕМС Служба Почты России. Срок отправки так же 7-14 дней без учета выходных.</p>
            <p className={classes.faq__text}>- После отправки вам на телефон придет СМС с трек-номером от Почты России.</p>
            <p className={classes.faq__text}>- (Трек-номер доставки СНГ / Мировая приходит на почту указанную в заказе)</p>
            <p className={classes.faq__text}>- Сроки отправки одинаковые для всех видов доставки.</p>
            <p className={classes.faq__text}>*Самовывоза нет!</p>
            <p className={classes.faq__text}>2) За сколько приходит посылка ?</p>
            <p className={classes.faq__text}>- Отправка от 5 до 14 дней , после отправки все зависит от адреса получателя , стандартные сроки от 2 до 7 дней.</p>
            <p className={classes.faq__text}>- Предзаказ - (PRE-ORDER) - отправка таких заказов осуществляется в течение 4 - 6 недель !</p>
            <p className={classes.faq__text}>*Просим обратить внимание что предзаказ невозвратный поскольку делается под заказ.</p>
            <p className={classes.faq__text}>- Как только ваш заказ отправляется - на мобильный телефон приходит трек-номер !</p>
            <p className={classes.faq__text}>- * Отправка Zip-Hoodie производится в течение 2-3 недель!</p>
            <p className={classes.faq__text}>3) Возврат?</p>
            <p className={classes.faq__text}>Возврат производится в случае, брака или если с нашей стороны была совершена ошибка.</p>
            <p className={classes.faq__text}>4) Как стирать ?</p>
            <p className={classes.faq__text}>Стирать только при 30 градусах желательно наизнанку.</p>
            <p className={classes.faq__text}>* Вопросы по заказам - laroutinemagazine@gmail.com</p>
        </div>
    );
};

export default Faq;