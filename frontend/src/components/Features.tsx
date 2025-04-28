import { Check } from 'lucide-react';

export const Features = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return <div>
        <div className='flex items-center'>
            <Check />
            <div className="font-semibold text-xs">
                {title}
            </div>
            <div className="pl-1 font-light text-xs">
                {subtitle}
            </div>
        </div>

    </div>
}