import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {  appendBunCart,
  appendIngredientCart,
  removeCart,
  sortCart} from "../../services/slices/cart"; 
import Order from "../order/order";
import styles from "./burger-constructor.module.css";
import { nanoid } from "@reduxjs/toolkit";

const constructorDataSelector = (state) => ({
  ingredients: state.ingredients?.data,
  bunIngredient: state.cart.bun,
  orderIngredients: state.cart.ingredients,
});

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredients, bunIngredient, orderIngredients } = useSelector(
    constructorDataSelector
  );
  const [ingredientsList, setIngredients] = useState(new Map());

  useEffect(() => {
    setIngredients(
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient]))
    );
  }, [ingredients]);

 
  const onDropIngredient = (item) => {
    dispatch(
      appendIngredientCart({
        id: item._id,
        uuid: nanoid(),
      })
    );
  };
  const onDropBun = (item) => {
    dispatch(appendBunCart(item._id));
  };
  
  const FirstBunItem = () => (
    <BunItem
      first={true}
      ingredient={ingredientsList.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );
  const LastBunItem = () => (
    <BunItem
      first={false}
      ingredient={ingredientsList.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );

  const onDeleteItem = (uuid) => {
    dispatch(removeCart(uuid));
  };
  const onSortItem = (oldUuid, newUuid) => {
    if (oldUuid === newUuid) return;

    dispatch(
      sortCart({
        oldUuid,
        newUuid,
      })
    );
  };

  const ScrollItems = () => (
    <DropTarget
      accept="ingredient"
      onDrop={onDropIngredient}
      className={styles.scrollItems}
    >
      {orderIngredients.length ? (
        orderIngredients.map(({ id, uuid }) => {
          const ingredient = ingredientsList.get(id);

          return (
            <React.Fragment key={uuid}>
              <IngredientItem
                ingredient={ingredient}
                uuid={uuid}
                onDelete={() => onDeleteItem(uuid)}
                onSortItem={(dropItem) => onSortItem(uuid, dropItem.uuid)}
              />
            </React.Fragment>
          );
        })
      ) : (
        <div className={`${styles.itemEmpty}`}>
          <div className={`${styles.emptyElement}`}>
            <span className={styles.emptyElementText}>
              Перенесите сюда ингредиент
            </span>
          </div>
        </div>
      )}
    </DropTarget>
  );

  return (
    <div className={styles.items}>
      <FirstBunItem />
      <ScrollItems />
      <LastBunItem />
      <Order bunItem={bunIngredient} orderIngredients={orderIngredients}/>
    </div>
  );
}

function IngredientItem(props) {
  const [_, drag] = useDrag({
    type: "order",
    item: { uuid: props.uuid },
  });

  return (
    <DropTarget onDrop={props.onSortItem} accept="order">
      <div ref={drag} className={styles.item}>
        <div className={styles.itemDrag}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={props.ingredient.name}
          thumbnail={props.ingredient.image_mobile}
          price={props.ingredient.price}
          handleClose={props.onDelete}
        />
      </div>
    </DropTarget>
  );
}

function BunItem(props) {
  const text = `${props.ingredient?.name} (${props.first ? "верх" : "низ"})`;

  return (
    <DropTarget onDrop={props.onDrop} accept="bun">
      {props.ingredient ? (
        <div className={styles.bunItem}>
          <ConstructorElement
            text={text}
            thumbnail={props.ingredient.image_mobile}
            price={props.ingredient.price}
            isLocked={true}
            type={props.first ? "top" : "bottom"}
          />
        </div>
      ) : (
        <div className={styles.bunItem}>
          <div
            className={`${styles.bunEmptyElement} ${
              props.first
                ? "constructor-element_pos_top"
                : "constructor-element_pos_bottom"
            }`}
          >
            <span className={styles.emptyElementText}>
              Положите сюда булку
            </span>
          </div>
        </div>
      )}
    </DropTarget>
  );
}

function DropTarget({ children, onDrop, accept, className }) {
  const [{ isHover }, dropTarget] = useDrop({
    accept,
    drop(item) {
      onDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <div className={className} ref={dropTarget}>
      {children}
    </div>
  );
}