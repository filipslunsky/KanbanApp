import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from './state/slice';
import Category from './Category';
import NewCategory from './NewCategory';
import './categories.css';

const Categories = () => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.general.nightMode);
    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const categories = useSelector(state => state.categories.categories);
    const categoriesStatus = useSelector(state => state.categories.updateCategoryStatus);
    const updateCategoryStatus = useSelector(state => state.categories.updateCategoryStatus);
    const deleteCategoryStatus = useSelector(state => state.categories.deleteCategoryStatus);
    console.log(currentProjectId);

    useEffect(() => {
        if (currentProjectId != null) {
            dispatch(getCategories({projectId: currentProjectId}));
        };
    }, [currentProjectId, dispatch, updateCategoryStatus, deleteCategoryStatus]);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    if (categoriesStatus === 'loading') {
        return (<div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>Loading...</div>)
    };

    if (categoriesStatus === 'failed') {
        return (<div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>Failed to load categories. Please refresh or try again later.</div>)
    };

    return (
        <>
            <div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>
                {
                    categories.length > 0 && categories.map(item => {
                        return (
                            <div className="categoriesCategoryMainContainer" key={item.category_id}>
                                <Category
                                categoryId={item.category_id}
                                categoryName={item.category_name}
                                />
                            </div>
                        )
                    })
                }
                <NewCategory />
            </div>
        </>
    );
}
 
export default Categories;