import { reactive } from "vue";
// Import icons
import IconArcade from './assets/images/icon-arcade.svg'
import IconAdvanced from './assets/images/icon-advanced.svg'
import IconPro from './assets/images/icon-pro.svg'

export const store = reactive({
  // available plan options
  plans: [
    {
      key: 1,
      icon: IconArcade,
      title: "Arcade",
      isSelected: false,
      price: {
        mo: 9,
        yr: 90,
      },
    },
    {
      key: 2,
      icon: IconAdvanced,
      title: "Advanced",
      isSelected: false,
      price: {
        mo: 12,
        yr: 120,
      },
    },
    {
      key: 3,
      icon: IconPro,
      title: "Pro",
      isSelected: false,
      price: {
        mo: 15,
        yr: 150,
      },
    },
  ],
  // available add-ons
  addons: [
    {
      title: "Online service",
      subtitle: "Access to multiplayer games",
      price: {
        mo: 1,
        yr: 10,
      },
      isChecked: false,
    },
    {
      title: "Larger storage",
      subtitle: "Extra 1TB of cloud save",
      price: {
        mo: 2,
        yr: 20,
      },
      isChecked: false,
    },
    {
      title: "Customizable profile",
      subtitle: "Custom theme on your profile",
      price: {
        mo: 2,
        yr: 20,
      },
      isChecked: false,
    },
  ],
});
