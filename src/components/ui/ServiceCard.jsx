import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon, path }) => {
  return (
    <Link to={path} className="block">
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-center text-gray-900">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;
