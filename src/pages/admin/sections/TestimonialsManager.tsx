import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface T { id: string; parent_name: string; child_program: string; quote: string; avatar_url: string; is_featured: boolean; sort_order: number }

export default function TestimonialsManager() {
    const [items, setItems] = useState<T[]>([])
    const [ed, setEd] = useState<Partial<T>|null>(null)
    const [sv, setSv] = useState(false)
    const f = async()=>{const{data}=await supabase.from('testimonials').select('*').order('sort_order');if(data)setItems(data)}
    useEffect(()=>{f()},[])
    const save=async()=>{if(!ed?.parent_name||!ed?.quote)return;setSv(true);if(ed.id)await supabase.from('testimonials').update(ed).eq('id',ed.id);else await supabase.from('testimonials').insert(ed);setSv(false);setEd(null);f()}
    const del=async(id:string)=>{if(!confirm('Delete?'))return;await supabase.from('testimonials').delete().eq('id',id);f()}

    if(ed)return(
        <div style={{maxWidth:600}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}><h3 style={{margin:0,fontSize:18,fontWeight:700}}>{ed.id?'Edit':'New'} Testimonial</h3><button className="adm-btn-s" onClick={()=>setEd(null)}>← Back</button></div>
            <div className="adm-card">
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                    <div><label className="adm-lbl">Parent Name</label><input className="adm-inp" value={ed.parent_name||''} onChange={e=>setEd({...ed,parent_name:e.target.value})} /></div>
                    <div><label className="adm-lbl">Child Program</label><input className="adm-inp" value={ed.child_program||''} onChange={e=>setEd({...ed,child_program:e.target.value})} placeholder="Parent of Elementary Student" /></div>
                    <div><label className="adm-lbl">Quote</label><textarea className="adm-ta" value={ed.quote||''} onChange={e=>setEd({...ed,quote:e.target.value})} /></div>
                    <div style={{display:'flex',gap:24,alignItems:'center'}}>
                        <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14,fontWeight:600}}><input type="checkbox" checked={ed.is_featured||false} onChange={e=>setEd({...ed,is_featured:e.target.checked})} /> Featured</label>
                        <div><label className="adm-lbl">Sort</label><input className="adm-inp" type="number" style={{width:80}} value={ed.sort_order||0} onChange={e=>setEd({...ed,sort_order:+e.target.value})} /></div>
                    </div>
                </div>
                <div style={{display:'flex',gap:12,marginTop:24}}><button className="adm-btn" onClick={save} disabled={sv}>{sv?'Saving...':'Save'}</button><button className="adm-btn-s" onClick={()=>setEd(null)}>Cancel</button></div>
            </div>
        </div>
    )
    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}><p style={{margin:0,color:'#78716C',fontSize:14}}>{items.length} testimonial{items.length!==1?'s':''}</p><button className="adm-btn" onClick={()=>setEd({parent_name:'',child_program:'',quote:'',avatar_url:'',is_featured:false,sort_order:0})}>+ New</button></div>
            <div className="adm-card" style={{padding:0,overflow:'hidden'}}>
                {items.length===0?<div className="adm-empty">No testimonials yet.</div>:(<table className="adm-tbl"><thead><tr><th>Name</th><th>Program</th><th>Featured</th><th></th></tr></thead><tbody>{items.map(t=>(<tr key={t.id}><td style={{fontWeight:600}}>{t.parent_name}</td><td>{t.child_program||'—'}</td><td>{t.is_featured?<span className="adm-bdg adm-bdg-g">Yes</span>:<span className="adm-bdg adm-bdg-gr">No</span>}</td><td style={{textAlign:'right'}}><div style={{display:'flex',gap:8,justifyContent:'flex-end'}}><button className="adm-btn-s" style={{padding:'6px 12px'}} onClick={()=>setEd(t)}>Edit</button><button className="adm-btn-d" style={{padding:'6px 12px'}} onClick={()=>del(t.id)}>Delete</button></div></td></tr>))}</tbody></table>)}
            </div>
        </div>
    )
}
