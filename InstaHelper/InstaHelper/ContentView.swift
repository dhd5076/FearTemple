//
//  ContentView.swift
//  InstaHelper
//
//  Created by Dylan Dunn on 8/14/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    @State private var selection = 0
 
    var body: some View {
        TabView(selection: $selection){
            MenuView()
                .font(.title)
                .tabItem {
                    VStack {
                        Image(systemName: "list.bullet")
                        Text("Menu")
                    }
                }
                .tag(0)
            BarcodeListView()
                .font(.title)
                .tabItem {
                    VStack {
                        Image(systemName: "rectangle.grid.1x2")
                        Text("Barcodes")
                    }
                }
                .tag(1)
            InfoView()
                .font(.title)
                .tabItem {
                    VStack {
                        Image(systemName: "info.circle")
                        Text("Info")
                    }
                }
                .tag(2)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
