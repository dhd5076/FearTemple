//
//  BreakfastView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/7/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct BreakfastView: View {
    var body: some View {
        List {
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://i.pinimg.com/474x/17/64/cd/1764cd4e6e46c7609a10a63928bb719a.jpg",
                itemName: "Blueberry Muffin",
                itemCost: 1.99,
                itemDescription: "Warm, delicate muffins filled with tart bursts of cranberry",
                isHighlighted: false))
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://photos.bigoven.com/recipe/hero/terry-waffles-b1e337.jpg?h=500&w=500",
                itemName: "Waffles", itemCost: 5.99,
                itemDescription: "Hot, fluffy, and made to order. Served with whipped butter and syrup",
                isHighlighted: true))
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://i.pinimg.com/474x/69/73/9d/69739dac38bd51f1c4ca9353351b0a1a.jpg",
                itemName: "Summer Squash, Spinach & Leek Frittata",
                itemCost: 6.99,
                itemDescription: "Savory frittata filled with a delicate mix of summer squash, spinach, and leeks",
                isHighlighted: false))
        }
        .navigationBarTitle("Breakfast")
    }
}

struct BreakfastView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            BreakfastView()
        }
    }
}
