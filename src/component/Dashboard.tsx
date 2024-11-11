import { useEffect, useState } from "react"
import {DashboardPieChart} from "./DashboardPieChart"
import { LoadingSpinner } from "./LoadingSpinner"
import { getDashboardData } from "../service/UserService"

export const Dashboard = ()=> {

    const [loading, setLoading] = useState(true)

    const [dataChart, setDataChart] = useState(
        {
            status: [
              {
                "name": "Ativo",
                "value": 2
              },
              {
                "name": "Inativo",
                "value": 1
              }
            ],
            profile: [
              {
                "name": "Admin",
                "value": 1
              },
              {
                "name": "Comum",
                "value": 2
              }
            ]
          }
    )

      const [dataProfiles, setDataProfiles] = useState([
        { name: 'Ativos', value: 4 },
        { name: 'Inativos', value: 12 },
      ])

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await getDashboardData();
              setDataChart(data)
              setLoading(false)
            } catch (error) {
                setLoading(false)
              console.error('Erro ao carregar os dados do usuário');
            }
          };
      
          fetchData();
    }, [])

    if(loading){
        return  <LoadingSpinner/>
    }


    return (
        <div className="flex row">
          <DashboardPieChart
           data={dataChart.status}
          colors={['#00C49F', '#FF8042', '#FFBB28', '#FF8042']}
          title="Distribuição por Status"
          
          />          
          <DashboardPieChart
           data={dataChart.profile}
          colors={['#00C49F', '#FF8042', '#FFBB28', '#FF8042']}
          title="Distribuição por Profile"
          
          />          
        </div>
    )
}