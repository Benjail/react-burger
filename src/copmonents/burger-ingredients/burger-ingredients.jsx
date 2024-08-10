
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingredientPropType } from "../../utils/types";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";
import { useDrag } from "react-dnd";
import { openDetails} from "../../services/slices/details"; 

import {loadIngredients} from '../.././services/slices/ingredients';

const ingredientTypesMap = {
  main: "Начинки",
  bun: "Булки",
  sauce: "Соусы",
};
const tabs = ["bun", "sauce", "main"].map((type) => ({
  type,
  title: ingredientTypesMap[type],
}));

const ingredientsDataSelector = (state) => ({
  ingredients: state.ingredients.data,
  loading: state.ingredients.loading,
  ingredientDetails: state.ingredients.data.find(
    (ingredient) => ingredient._id === state.details.ingredient
  ),
  countsMap: state.cart.ingredients.reduce((map, { id }) => {
    map.set(id, (map.get(id) || 0) + 1);
    return map;
  }, new Map(state.cart.bun ? [[state.cart.bun, 2]] : [])),
});

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState("bun");
  const [groupIngredients, setGroupIngredients] = useState([]);
  const [thresholds, setThreshholds] = useState({});
  const { ingredients,loading, ingredientDetails, countsMap} = useSelector(
    ingredientsDataSelector
  );

  const scrollRef = useRef();
  const dispatch = useDispatch();

  const categoriesRefs = {
    main: useRef(),
    bun: useRef(),
    sauce: useRef(),
  };

  useEffect(() => {
    setGroupIngredients(getIngredientsList(ingredients));
  }, [ingredients]);

  useEffect(() => {
    const keys = Object.keys(thresholds);
    const closestTab =
      keys.length &&
      keys.reduce((max, key) =>
        thresholds[key] > thresholds[max] ? key : max
      );

    if (closestTab) {
      setCurrentTab(closestTab);
    }
  }, [thresholds]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setThreshholds((state) => ({
            ...state,
            [entry.target.dataset?.type]: entry.isIntersecting
              ? entry.intersectionRatio
              : 0,
          }));
        });
      },
      {
        root: scrollRef.current,
        threshold: Array.from({ length: 10, value: null }).map(
          (_, i) => (i + 1) / 10
        ),
      }
    );

    groupIngredients.forEach((group) => {
      if (categoriesRefs[group.type].current) {
        observer.observe(categoriesRefs[group.type].current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [groupIngredients]);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

if (loading) {
  return <div>Loading...</div>;  // Отображаем индикатор загрузки
}
  function onTabClick(currentTab) {
    setCurrentTab(currentTab);
    categoriesRefs[currentTab]?.current?.scrollIntoView();
  }

  function onIngredientClick(ingredient) {
    if (ingredient) {
      dispatch(openDetails(ingredient._id));
    } else {
      dispatch(openDetails());
    }
  }

  return (

    <div className={styles.wrapper}>
      <Tabs currentTab={currentTab} onChange={onTabClick} />

      <div className={styles.categoriesList} ref={scrollRef}>
        {groupIngredients.map(({ type, title, ingredients }) => (
          <div key={type} ref={categoriesRefs[type]} data-type={type}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.ingredientList}>
              {ingredients.map((ingredient) => (
                <React.Fragment key={ingredient._id}>
                  <IngredientItem
                    count={countsMap.get(ingredient._id)}
                    ingredient={ingredient}
                    onClick={() => onIngredientClick(ingredient)}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      {ingredientDetails && (
        <Modal header="Детали ингредиента" onClose={() => onIngredientClick(null)}>
          <IngredientDetails ingredient={ingredientDetails} />
        </Modal>
      )}
    </div>
  );
}

const IngredientItem = React.memo((props) => {
  const [_, drag] = useDrag({
    type: props.ingredient.type === "bun" ? "bun" : "ingredient",
    item: props.ingredient,
  });

  return (
    <section className={styles.ingredientItem} onClick={props.onClick} ref={drag}>
      <div className={styles.ingredientItemCount}>
        {props.count ? <Counter count={props.count} size="default" /> : null}
      </div>
      <img
        src={props.ingredient.image}
        className={styles.ingredientItemImg}
        alt={props.ingredient.name}
      />
      <p className={styles.ingredientItemPrice}>
        <span className="mr-2">{props.ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <h4 className="text text_type_main-default">{props.ingredient.name}</h4>
    </section>
  );
});
IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
};

function getIngredientsList(ingredients) {
  if (!ingredients) {
    return [];
  }

  const typesGroupMap = new Map();

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const typeIngredients = typesGroupMap.get(ingredient.type) || [];

    typeIngredients.push(ingredient);

    typesGroupMap.set(ingredient.type, typeIngredients);
  }

  const indexTabMap = tabs.reduce((res, { type }, i) => {
    res[type] = i;

    return res;
  }, {});

  return Array.from(typesGroupMap)
    .map(([type, typeIngredients]) => ({
      type: type,
      title: ingredientTypesMap[type],
      ingredients: typeIngredients,
    }))
    .sort((a, b) => indexTabMap[a.type] - indexTabMap[b.type]);
}

function Tabs(props) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ type, title }) => (
        <Tab
          key={type}
          value={type}
          active={props.currentTab === type}
          onClick={props.onChange}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
}
Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentTab: PropTypes.oneOf(["main", "bun", "sauce"]).isRequired,
};
