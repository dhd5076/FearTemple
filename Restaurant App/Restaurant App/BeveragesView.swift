//
//  BeveragesView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/8/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct BeveragesView: View {
    var body: some View {
        List {
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://photos.bigoven.com/recipe/hero/black-ice-tea-lemon-2319753.jpg?h=500&w=500",
                itemName: "Ice Tea",
                itemCost: 1.99,
                itemDescription: "Refreshing Ice Tea. 16oz",
                isHighlighted: false))
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://photos.bigoven.com/recipe/hero/fresh-lemonade-2.jpg?h=500&w=500",
                itemName: "Lemonade",
                itemCost: 1.99,
                itemDescription: "Thirst Quenching Fresh Squeezed Lemonade. 16oz",
                isHighlighted: false))
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://b3h2.scene7.com/is/image/BedBathandBeyond/370309114881956p?$imagePLP$&wid=256&hei=256",
                itemName: "Water",
                itemCost: 0.99,
                itemDescription: "Filtered Water, 16oz",
                isHighlighted: false))
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://cdn11.bigcommerce.com/s-t4yqg98af9/images/stencil/640w/products/400628/5145945/apixkyd2f__25650.1535045062.jpg?c=2&imbypass=on",
                itemName: "Coca Cola",
                itemCost: 1.99,
                itemDescription: "Coca Cola, 12oz Can",
                isHighlighted: false))
        }
        .navigationBarTitle("Beverages")
    }
}

struct BeveragesView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            BeveragesView()
        }
    }
}
