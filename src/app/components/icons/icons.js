import {
  Search,
  ShoppingCart,
  Heart,
  Truck,
  LockKeyhole,
  Star,
  RotateCcw,
  PhoneCall,
  Mail,
  Package,
  Store,
  MapPin,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
 
} from "lucide-react";

const icons = {
  search: Search,
  cart: ShoppingCart,
  heart: Heart,
  truck: Truck,
  lock: LockKeyhole,
  star: Star,
  return: RotateCcw,
  contact:PhoneCall,
  mail:Mail,
  package:Package,
  store: Store,
  location:MapPin ,
  check:CheckCircle,
  left:ArrowLeft,
  right:ArrowRight,
  
};

export default function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = "currentColor",
}) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      color={color}
    />
  );
}