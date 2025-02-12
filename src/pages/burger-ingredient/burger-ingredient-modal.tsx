import { useCallback, useEffect, useState } from "react";
import { useSelector } from "../../services/hooks/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IngredientDetails} from "../../copmonents/burger-ingredients/ingredient-details/ingredient-details";
import { Modal } from "../../copmonents/modal/modal";
import { Ingredient } from "../../utils/types";

export default function BurgerIngredientModal() {
  const { productId } = useParams<{productId: string}>();
  const ingredients = useSelector((state) => state.ingredients.data) ;
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<Ingredient>();

  const onCloseModal = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, [navigate, location]);

  useEffect(() => {
    setProduct(ingredients?.find(({ _id }) => _id === productId));
  }, [ingredients, productId]);

  return (
    <Modal header="Детали ингредиента" onClose={onCloseModal }>
      {product && <IngredientDetails ingredient={product} />}
    </Modal>
  );
}
