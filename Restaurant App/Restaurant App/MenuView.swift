//
//  MenuView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/7/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI
import URLImage

struct MenuView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 12) {
                List {
                    MenuCategoryView(
                        categoryPicture: "https://photos.bigoven.com/recipe/hero/mediterranean-breakfast-burrit-6afebb.jpg?h=500&w=500",
                        categoryName: "Breakfast",
                        destination: BreakfastView())
                    MenuCategoryView(
                        categoryPicture: "https://photos.bigoven.com/recipe/hero/tasty-cheeseburger-dinner.jpg?h=500&w=500",
                        categoryName: "Entrées",
                        destination: EntreesView())
                    MenuCategoryView(
                        categoryPicture: "https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_2282_1550.JPEG",
                        categoryName: "Salads",
                        destination: SaladsView())
                    MenuCategoryView(
                        categoryPicture: "https://pbs.twimg.com/profile_images/3517216662/c95464a02012cb9c5f0df5a560210d57_400x400.jpeg",
                        categoryName: "Sides",
                        destination: SidesView())
                    MenuCategoryView(
                        categoryPicture: "https://photos.bigoven.com/recipe/hero/fresh-squeezed-lemonade.jpg?h=500&w=500",
                        categoryName: "Beverages",
                        destination: BeveragesView())
                    MenuCategoryView(
                        categoryPicture: "https://mealplannerpro.com/images/recipes/4/761874_256x256.jpg",
                        categoryName: "Desserts",
                        destination: DessertsView())
                }
                .navigationBarTitle("Menu")
            }
        }
    }
}

struct MenuCategoryView<Content : View >: View {
    @State public var categoryPicture : String
    @State public var categoryName : String
    @State public var destination: Content
    
    var body : some View {
        NavigationLink(destination: destination) {
            HStack {
                URLImage(URL(string: categoryPicture)!) { proxy in
                    proxy.image
                        .resizable()
                }
                .frame(width: 64, height: 64)
                .cornerRadius(12)
                Text(self.categoryName)
            }
        }
    }
}

struct MenuView_Previews: PreviewProvider {
    static var previews: some View {
        MenuView()
    }
}
