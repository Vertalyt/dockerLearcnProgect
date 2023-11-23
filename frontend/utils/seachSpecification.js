
export function seachSpecification(infoProducts) {
    const uniqueIds = new Set(); // Используем Set для отслеживания уникальных идентификаторов
  
    const result = infoProducts.value
      .map((item) => {
        return {
          id: item.specification[item.specification.length - 1],
          title: item.specification
        };
      })
      .filter((item) => {
        // Фильтруем только уникальные идентификаторы
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id); // Добавляем идентификатор в Set
          return true;
        }
        return false;
      })
      .sort((a, b) => a.id - b.id); // Сортировка по возрастанию id
  
    return result;
  }
  
  