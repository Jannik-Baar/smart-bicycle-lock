import SwiftUI
import MapKit

struct ContentView: View {
    @State private var rotationAngle: Angle = .zero
    @State private var isGreenCircle = true
    @State private var userLocation: CLLocationCoordinate2D?

    var body: some View {
        ZStack {
            Color.clear // Add a clear color background to allow the status bar to be visible

            Spacer()
            
            Image(systemName: "circle.fill")
                .imageScale(.large)
                .font(.system(size: 500))
                .foregroundColor(isGreenCircle ? .green : .red) // Green if isGreenCircle is true, red otherwise
                .offset(y: -170)
            
            Image(systemName: "lock.open.rotation")
                .imageScale(.large)
                .font(.system(size: 150))
                .foregroundColor(isGreenCircle ? .red : .green) // Red if isGreenCircle is true, green otherwise
                .rotationEffect(rotationAngle)
                .offset(x: 0, y: 15)
                .onTapGesture {
                    withAnimation {
                        rotationAngle += .degrees(360)
                        isGreenCircle.toggle() // Toggle the isGreenCircle property
                        updateLocation()
                    }
                }
            
            VStack(alignment: .leading, spacing: 0) {
                Text("Mein Fahrrad")
                    .font(.largeTitle)
                    .bold()
                    .foregroundColor(.white)
                    .padding(.top, 10)
                    .padding(.trailing, 160)
                
                Spacer()
            }
        }
        .padding()
        .statusBar(hidden: false) // Show the default status bar
    }

    private func updateLocation() {
        // Simulate fetching user's current location
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            userLocation = CLLocationCoordinate2D(latitude: 53.1467, longitude: 8.1831)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
