//
//  DessertsView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/8/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct DessertsView: View {
    var body: some View {
        List {
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://photos.bigoven.com/recipe/hero/brownies-e8d4e6.jpg?h=500&w=500",
                itemName: "Melt Away Brownie",
                itemCost: 2.99,
                itemDescription: "Chewy, rich, chocolate brownies",
                isHighlighted: true))
            MenuItemListView(menuItem: MenuItem(
                itemPicture: "https://photos.bigoven.com/recipe/hero/chocolate-chip-oatmeal-cookies-3.jpg?h=500&w=500",
                itemName: "Oatmeal Cookie",
                itemCost: 2.99,
                itemDescription: "Chewy, nostalgia inducing oatmeal cookies ",
                isHighlighted: false))
        }
        .navigationBarTitle("Desserts")
    }
}

struct DessertsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            DessertsView()
        }
    }
}
