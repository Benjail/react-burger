import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { useLocation,  Link, } from "react-router-dom";
import { IngredientType } from "../../utils/types";
import IngredientItem from "./ingredient-item/ingredient-item";
import { getIngredients } from "../../services/slices/ingredients-slice";

const BurgerIngredients = () => {
  const { error, data } = useSelector((store: any) => store.ingredients);
  const dispatch: any = useDispatch();
  const tabsRef = useRef<HTMLDivElement>(null);
  const groupBunRef = useRef<HTMLHeadingElement>(null);
  const groupSauceRef = useRef<HTMLHeadingElement>(null);
  const groupMainRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<IngredientType>('bun');
  const location = useLocation();

  useEffect(() => {
    
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollIngredientGroup = () => {
    const tabsTopCoord = tabsRef.current?.getBoundingClientRect().top;
    const bunTopCoord = groupBunRef.current?.getBoundingClientRect().top;
    const sauceTopCoord = groupSauceRef.current?.getBoundingClientRect().top;
    const mainTopCoord = groupMainRef.current?.getBoundingClientRect().top;
    if (tabsTopCoord && bunTopCoord && sauceTopCoord && mainTopCoord) {
      const arr: number[] = [bunTopCoord, sauceTopCoord, mainTopCoord];
      const closestIndex = arr.findIndex(
        (elem: number) => elem === arr.reduce((prev: number, curr: number) => (Math.abs(curr - tabsTopCoord) < Math.abs(prev - tabsTopCoord) ? curr : prev))
      );
      switch (closestIndex) {
        case 0:
          if (activeTab !== 'bun') setActiveTab('bun');
          break;
        case 1:
          if (activeTab !== 'sauce') setActiveTab('sauce');
          break;
        case 2:
          if (activeTab !== 'main') setActiveTab('main');
          break;
        default:
          setActiveTab('bun');
          break;
      }
    }
  };

  const handleClickTab = (tab: string) => {
    if (activeTab !== 'bun') setActiveTab('bun');
    switch (tab) {
      case 'bun':
        groupBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        groupSauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        groupMainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        groupBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <>
      {error && <>Ошибка при загрузке ингредиентов</>}
      {data && (
        <article className={`pt-10 pb-10`}>
          <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
          <div ref={tabsRef} className={`${styles.tabs} mb-10`}>
            <Tab value='bun' active={activeTab === 'bun'} onClick={handleClickTab}>
              Булки
            </Tab>
            <Tab value='sauce' active={activeTab === 'sauce'} onClick={handleClickTab}>
              Соусы
            </Tab>
            <Tab value='main' active={activeTab === 'main'} onClick={handleClickTab}>
              Начинки
            </Tab>
          </div>
          <div className={`${styles.group}`} onScroll={handleScrollIngredientGroup}>
            <section>
              <h2 className='text text_type_main-medium' ref={groupBunRef}>
                Булки
              </h2>
              <ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
                {data
                //@ts-ignore
                  .filter((ingredient) => ingredient.type === 'bun')
                  //@ts-ignore
                  .map((ingredient) => (
                    <Link className={styles.link} key={ingredient._id} to={`/ingredient/${ingredient._id}`} state={{ backgroundLocation: location }}>
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    </Link>
                  ))}
              </ul>
            </section>
            <section>
              <h2 className='text text_type_main-medium' ref={groupSauceRef}>
                Соусы
              </h2>
              <ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
                {data
                 //@ts-ignore
                  .filter((ingredient) => ingredient.type === 'sauce')
                   //@ts-ignore
                  .map((ingredient) => (
                    <Link className={styles.link} key={ingredient._id} to={`/ingredient/${ingredient._id}`} state={{ backgroundLocation: location }}>
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    </Link>
                  ))}
              </ul>
            </section>
            <section>
              <h2 className='text text_type_main-medium' ref={groupMainRef}>
                Начинки
              </h2>
              <ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
                {data
                 //@ts-ignore
                  .filter((ingredient) => ingredient.type === 'main')
                   //@ts-ignore
                  .map((ingredient) => (
                    <Link className={styles.link} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} replace={true}>
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    </Link>
                  ))}
              </ul>
            </section>
          </div>
        </article>
      )}
    </>
  );
};

export default BurgerIngredients;