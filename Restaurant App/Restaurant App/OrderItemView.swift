//
//  OrderItemView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/8/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI
import URLImage

struct OrderItemView: View {
    @State public var menuItem : MenuItem
    
    var body: some View {
        HStack {
            HStack {
                URLImage(URL(string: menuItem.itemPicture)!) { proxy in
                    proxy.image
                        .resizable()
                }
                .frame(width: 64, height: 64)
                .cornerRadius(12)
                Text(self.menuItem.itemName)
                .font(.subheadline)
            }
            Spacer()
            Text("$\(String(format: "%.2f", self.menuItem.itemCost))")
            .font(.headline)
        }
    }
}

struct OrderItemView_Previews: PreviewProvider {
    static var previews: some View {
        OrderItemView(menuItem: MenuItem(
            itemPicture: "Item",
            itemName: "Example Item",
            itemCost: 1.99,
            itemDescription: "Example Description",
            isHighlighted: false))
    }
}
