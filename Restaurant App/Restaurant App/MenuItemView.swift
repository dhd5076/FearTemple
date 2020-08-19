//
//  MenuItemView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/7/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI
import URLImage

struct MenuItemView: View {
    @State public var menuItem: MenuItem
    
    @EnvironmentObject public var order : Order
    
    var body: some View {
        VStack(spacing: 12) {
            ZStack {
                URLImage(URL(string: menuItem.itemPicture)!) { proxy in
                    proxy.image
                        .resizable()
                        .blur(radius: 100)
                }
                .frame(maxWidth: .infinity, maxHeight: 200)
                URLImage(URL(string: menuItem.itemPicture)!) { proxy in
                    proxy.image
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .overlay(Circle().stroke(Color.black, lineWidth: 1))
                }
                .frame(maxHeight: 200)
                .cornerRadius(360)
            }
            HStack {
                Text(self.menuItem.itemName)
                if(self.menuItem.isHighlighted) {
                    Image(systemName: "star.fill")
                        .resizable()
                        .foregroundColor(.yellow)
                        .frame(width: 16, height: 16)
                }
            }
            .padding(.bottom, 24)
            HStack {
                Text("$\(String(format: "%.2f", self.menuItem.itemCost))")
                    .font(.headline)
                Spacer()
            }
            Text(self.menuItem.itemDescription)
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            Spacer()
            Button(action: {
                self.order.orderItems.append(self.menuItem)
                self.order.orderTotal += self.menuItem.itemCost
            }) {
                Text("Add To Order")
                    .font(.title)
                    .foregroundColor(.black)
            }
            .padding(12)
            .frame(maxWidth: .infinity)
            .accentColor(Color.white)
            .background(Color.yellow)
            .cornerRadius(12)
        }
        .padding(12)

        .navigationBarTitle(self.menuItem.itemName)    }
}

struct MenuItemView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            MenuItemView(menuItem: MenuItem(
                itemPicture: "https://photos.bigoven.com/recipe/hero/spinach-grape-tomato-cheddar-f-e9717c.jpg?h=500&w=500",
                itemName: "Example Item",
                itemCost: 1.99,
                itemDescription: "Example Description",
                isHighlighted: true))
        }
        .environment(\.colorScheme, .dark)
    }
}
