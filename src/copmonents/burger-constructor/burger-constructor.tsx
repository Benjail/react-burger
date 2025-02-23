import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ReactNode, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import {
  appendBunCart, appendIngredientCart, removeCart, sortCart
} from "../../services/slices/cart-slice";
import Order from "../order/order";
import styles from "./burger-constructor.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";

type BunItemProps = {
  first: boolean;
  ingredient?: Ingredient;
  onDrop: (item: Ingredient) => void;
}

type DropTargetProps = {
  children: ReactNode;
  onDrop: (item: any) => void;
  accept: string;
  className?: string;
  position? : string; 
}

type IngredientItemProps = {
  ingredient: Ingredient;
  uuid: string;
  onDelete: () => void;
  onSortItem: (item: { uuid: string }) => void;
}

export const BurgerConstructor = (): React.JSX.Element  =>{
const dispatch = useDispatch();

const ingredients = useSelector((store) => store.ingredients.data);
const cartIngredients = useSelector((store) => store.cart.ingredients);
const bunIngredient = useSelector((store) => store.cart.bun);

const [ingredientsMap, setIngredientsMap] = useState(new Map());

  useEffect(() => {
    setIngredientsMap(
      ingredients 
       ? new Map(ingredients.map((ingredient : Ingredient) => [ingredient._id, ingredient])
    ): new Map());
  }, [ingredients]);

  const onDropBun = (item: Ingredient) => {
    dispatch(appendBunCart(item._id));
  };
  const onDropIngredient = (item: Ingredient) => {
    dispatch(
      appendIngredientCart({
        _id: item._id,
        uuid: nanoid(),
      })
    );
  };

  const FirstBunItem = () => (
    <BunItem
      first={true}
      ingredient={ingredientsMap.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );
  const LastBunItem = () => (
    <BunItem
      first={false}
      ingredient={ingredientsMap.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );

  const onDeleteItem = (uuid: string) => {
    dispatch(removeCart(uuid));
  };
  const onSortItem = (prevUuid: string, newUuid: string) => {
    if (prevUuid === newUuid) return;
    dispatch(
      sortCart({
        prevUuid,
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
      {cartIngredients.length ? (
        cartIngredients.map(({ _id, uuid }) => {
          const ingredient = ingredientsMap.get(_id);

          if (!ingredient) {
            return null;
          }
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
      <Order bunItem={bunIngredient} cartIngredients={cartIngredients}/>
    </div>
  );
}

export const IngredientItem= (props: IngredientItemProps): React.JSX.Element =>  {
  const { ingredient } = props;
  const [, drag] = useDrag({
    type: "order",
    item: { uuid: props.uuid },
  });

  if (!ingredient) {
    return <></>;
  }
  return (
    <DropTarget onDrop={props.onSortItem} accept="order">
      <div ref={drag} className={styles.item}>
        <div className={styles.itemDrag}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          price={ingredient.price}
          handleClose={props.onDelete}
        />
      </div>
    </DropTarget>
  );
}

function BunItem(props: BunItemProps) {
  const text = `${props.ingredient?.name} (${props.first ? "верх" : "низ"})`;

  return (
    <DropTarget onDrop={props.onDrop} accept="bun" position={props.first ? "top" : "bottom"}>
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

function DropTarget({ children, onDrop, accept, className, position}: DropTargetProps ) {
  const [, dropTarget] = useDrop({
    accept,
    drop(item) {
      onDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <div className={className} ref={dropTarget} data-testid={`${accept}-drop-target${position ? `-${position}` : ''}`}>
      {children}
    </div>
  );
}
