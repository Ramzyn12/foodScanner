import { View, Text } from "react-native";
import React, { useEffect } from "react";

const List = () => {
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    const res = await fetch(
      "https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=chicken%20breast%20Asda&sort_by=unique_scans_n&page_size=24&json=1"
    );
    const data = await res.json();
    console.log(data.products);
    return data.products[0];
  };

  return (
    <View>
      <Text>List</Text>
    </View>
  );
};

export default List;
