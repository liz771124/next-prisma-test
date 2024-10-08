import 'tw-elements/css/tw-elements.min.css';
import { supabase } from '@/lib/supabase'


export default function Home() {
  const setNewView = async ()=> {
    const { data, error } = await supabase.from("views").insert({
      name: 'radom name'
    });
    if(data) console.log(data)
    if(data) console.log(error)
  }

  async function fetchData() {
    const { data } = await supabase.from('views').select('*');
    if(data) console.log(data)
  }
  fetchData();

  setNewView()

  return (
    <div className="container mx-auto p-4">
      <div>1234</div>
    </div>
  );
}