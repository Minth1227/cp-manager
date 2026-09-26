import re
import sys
import shutil

def refactor_dashboard(file_path):
    # Backup original first if not exists
    backup_path = file_path.replace('.js', '_backup.js')
    shutil.copyfile(backup_path, file_path) # Restore from backup first

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The entire block from page-header to roadmap-callout is inside html += ` ... `;
    # Let's extract the whole template literal first.
    template_regex = re.compile(r"(html \+= `\n\s*<div class=\"page-header\".*?</div>`;)", re.DOTALL)
    template_match = template_regex.search(content)
    if not template_match:
        print("Template literal not found in " + file_path)
        sys.exit(1)
        
    template_content = template_match.group(1)
    
    header_regex = re.compile(r'(<div class="page-header".*?</div>\n)', re.DOTALL)
    header_match = header_regex.search(template_content)
        
    basic_info_regex = re.compile(r'(<!-- ── 기본정보.*?</div>\n    </div>\n)', re.DOTALL)
    basic_info_match = basic_info_regex.search(template_content)
    
    todo_regex = re.compile(r'(<!-- ── 🔔 맞춤형 To-Do 리스트.*?}\)\(\)}\n)', re.DOTALL)
    todo_match = todo_regex.search(template_content)
    
    edu_regex = re.compile(r'(<!-- ── CP 교육이수 현황 위젯.*?</div>\n    </div>\n)', re.DOTALL)
    edu_match = edu_regex.search(template_content)
    
    export_regex = re.compile(r'(<!-- ── 📦 제품 및 수출 거래 통합 관리.*?</div>\n    </div>\n    </div>\n)', re.DOTALL)
    export_match = export_regex.search(template_content)
    
    callout_regex = re.compile(r'(<div class="roadmap-callout".*?</div>)', re.DOTALL)
    callout_match = callout_regex.search(template_content)
    
    if not (header_match and basic_info_match and todo_match and edu_match and export_match and callout_match):
        print("One or more blocks not found in " + file_path)
        sys.exit(1)
        
    new_template_content = f"""html += `
    {header_match.group(1)}
    {todo_match.group(1)}
    {basic_info_match.group(1)}
    {edu_match.group(1)}
    {callout_match.group(1)}
`;"""

    remaining_content = content.replace(template_content, new_template_content)
        
    track2_header = "const tradePhases = phases.filter(p => p.track === 'TRADE');\n  if (tradePhases.length > 0) {"
    if track2_header not in remaining_content:
        print("Track 2 header not found")
        sys.exit(1)
        
    parts = remaining_content.split(track2_header)
    
    track2_code = f"""{track2_header}
    html += '<h3 style="font-size:1.1rem;font-weight:600;margin:var(--space-xl) 0 var(--space-md); color:var(--accent-blue);"><span class="material-symbols-rounded" style="vertical-align:middle;">flight_takeoff</span> Track 2: 무역 거래 통제 실무</h3>';
    
    html += `
    {export_match.group(1)}
    `;

    const activeTxId = getSelectedTransactionId();
    const txs = getTransactions();
    const activeProdId = getSelectedProductId();
    let validTxId = activeTxId;
    if (activeTxId) {{
      const activeTx = txs.find(t => t.id === activeTxId);
      if (activeTx && activeTx.prodId !== activeProdId) {{
        validTxId = null;
      }}
    }}

    if (validTxId) {{
      tradePhases.forEach(phase => {{ html += renderDashboardPhase(phase); }});
    }} else {{
      html += '<div class="card" style="padding:40px; text-align:center; color:var(--text-tertiary); background:var(--bg-card); border:1px dashed var(--border-default); border-radius:8px;"><span class="material-symbols-rounded" style="font-size:3rem; margin-bottom:12px; color:var(--accent-blue); opacity:0.6;">local_shipping</span><br/><strong style="font-size:1.1rem;">수출 거래를 선택해주세요</strong><p style="margin-top:8px; font-size:0.9rem;">위의 컨트롤 센터에서 제품 및 거래를 선택해야 무역 거래 통제 실무(Track 2) 서식을 작성할 수 있습니다.</p></div>';
    }}
  }}
"""
    
    old_track2_regex = re.compile(r"html \+= '<h3.*?Track 2: 무역 거래 통제 실무</h3>';\s*tradePhases\.forEach\(phase => \{ html \+= renderDashboardPhase\(phase\); \}\);\s*\}", re.DOTALL)
    parts[1] = old_track2_regex.sub('', parts[1])

    final_content = parts[0] + track2_code + parts[1]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
        print("Success for " + file_path)

if __name__ == '__main__':
    refactor_dashboard(sys.argv[1])
