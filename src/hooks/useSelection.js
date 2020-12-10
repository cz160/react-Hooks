import { useState, useMemo } from "react";

const useSelection = (list, defaultSelect) => {
  const [selectd, setSelected] = useState(defaultSelect);

  const selectSet = useMemo(() => new Set(selectd), [selectd]);

  const singleActions = useMemo(() => {
    // 是否被选中
    const isSelected = (item) => selectSet.has(item);
    // 选择
    const select = (item) => {
      selectSet.add(item);
      return setSelected(Array.from(selectSet));
    };

    // 取消选择
    const unSelect = (item) => {
      selectSet.delete(item);
      return setSelected(Array.from(selectSet));
    };
    // 返选
    const toggle = (item) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return { isSelected, select, unSelect, toggle };
  }, [selectSet]);

  const allSelectActions = useMemo(() => {
    // 是否全部被选择
    const isAllSelected = selectd.length === list.length;
    // 选择
    const selectAll = () => {
      list.forEach((item) => {
        selectSet.add(item);
      });
      return setSelected(Array.from(selectSet));
    };
    // 取消选择
    const unSelectAll = () => {
      list.forEach((item) => {
        selectSet.delete(item);
      });
      setSelected(Array.from(selectSet));
    };
    // 反选全部
    const toggleAll = () => {
      if (isAllSelected) {
        unSelectAll();
      } else {
        selectAll();
      }
    };

    return { toggleAll, unSelectAll, selectAll, isAllSelected };
  }, [list, selectSet]);

  return {
    ...singleActions,
    ...allSelectActions,
    selectd,
    setSelected,
  };
};
export default useSelection;
