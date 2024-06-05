import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore((state) => state.showNotification);

  const categories = useAppStore((state) => state.categories);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validando que los datos no esten vacios
    if (Object.values(searchFilters).includes("")) {
      showNotification({
        error: true,
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    // Consultar Recetas
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? " bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className=" mx-auto container px-8 py-16">
        <div className=" flex justify-between items-center">
          <div>
            <img className=" w-32" src="/drink.svg" alt="Logotipo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " text-cyan-400 uppercase font-bold cursor-default p-2 rounded-md"
                  : " text-white uppercase font-bold hover:bg-slate-700 p-2 rounded-md"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? " text-cyan-400 uppercase font-bold p-2 rounded-md cursor-default"
                  : " text-white uppercase font-bold hover:bg-slate-700 p-2 rounded-md"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className=" md:w-1/2 2xl:w-1/3 bg-cyan-500 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className=" space-y-4">
              <label
                htmlFor="ingredient"
                className=" block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className=" p-3 w-full rounded-lg  focus:outline-none"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className=" space-y-4">
              <label
                htmlFor="category"
                className=" block text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                name="category"
                id="category"
                className="  p-3 w-full rounded-lg  focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Receta"
              className=" cursor-pointer bg-cyan-800 hover:bg-cyan-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
